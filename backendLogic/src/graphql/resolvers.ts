import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Medicine } from "../entity/Medecine";
import { Order } from "../entity/Order";
import { Cart } from "../entity/Cart";
import { CartItem } from "../entity/CartItem";


export const resolvers = {
  Query: {
    async getUsers(): Promise<User[]> {
      // Include role in the retrieved users
      return AppDataSource.getRepository(User).find();
    },
    async getUser(_: unknown, { id }: { id: number }): Promise<User | null> {
      // Fetch the user by ID, including the role
      return AppDataSource.getRepository(User).findOne({ where: { id } });
    },
    async getMedicines(): Promise<Medicine[]> {
      return AppDataSource.getRepository(Medicine).find();
    },
    async getMedicine(_: unknown, { id }: { id: number }): Promise<Medicine | null> {
      return AppDataSource.getRepository(Medicine).findOne({ where: { id } });
    },
    async getOrders(): Promise<Order[]> {
      return AppDataSource.getRepository(Order).find({ relations: ["patient", "medicine"] });
    },
    async getCompletedOrders(): Promise<Order[]> {
      return AppDataSource.getRepository(Order).find({
        where: { status: "COMPLETED" },
        relations: ["patient", "medicine"],
      });
    },
    async getCart(_: unknown, { userId }: { userId: number }): Promise<Cart | null> {
      return AppDataSource.getRepository(Cart).findOne({
        where: { user: { id: userId } },
        relations: ["items", "items.medicine"],
      });
    },
  },
  Mutation: {
    async registerUser(
      _: unknown,
      { firstName, lastName, username, email, phoneNumber, nationalId, licenseNumber, password, role }: User
    ): Promise<User> {
      // Include role when registering a new user
      const user = AppDataSource.getRepository(User).create({
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        nationalId,
        licenseNumber,
        password, // Plain storage of the password
        role,
      });
      return AppDataSource.getRepository(User).save(user);
    },


    async addMedicine(_: unknown, args: Medicine): Promise<Medicine> {
      const medicine = AppDataSource.getRepository(Medicine).create(args);
      return AppDataSource.getRepository(Medicine).save(medicine);
    },


    async placeOrder(
      _: unknown,
      { patientId, medicineId, quantity }: { patientId: number; medicineId: number; quantity: number }
    ): Promise<Order> {
      const patient = await AppDataSource.getRepository(User).findOne({ where: { id: patientId } });
      const medicine = await AppDataSource.getRepository(Medicine).findOne({ where: { id: medicineId } });


      if (!patient || !medicine) throw new Error("Invalid patient or medicine");


      const totalPrice = (medicine.amount ?? 0) * quantity;
      const order = AppDataSource.getRepository(Order).create({
        patient,
        medicine,
        quantity,
        totalPrice,
        status: "PENDING",
      });


      return AppDataSource.getRepository(Order).save(order);
    },


    async updateOrderStatus(
      _: unknown,
      { id, status }: { id: number; status: "PENDING" | "APPROVED" | "COMPLETED" }
    ): Promise<Order> {
      const order = await AppDataSource.getRepository(Order).findOne({ where: { id } });
      if (!order) throw new Error("Order not found");
      order.status = status;
      return AppDataSource.getRepository(Order).save(order);
    },


    async addToCart(
      _: unknown,
      { userId, medicineId, quantity }: { userId: number; medicineId: number; quantity: number }
    ): Promise<Cart> {
      const medicine = await AppDataSource.getRepository(Medicine).findOne({ where: { id: medicineId } });
      if (!medicine) throw new Error("Invalid medicine");
   
      let cart = await AppDataSource.getRepository(Cart).findOne({
        where: { user: { id: userId }, checkedOut: false },
        relations: ["items", "items.medicine"],
      });
   
      if (!cart) {
        cart = AppDataSource.getRepository(Cart).create({
          user: { id: userId }, // Directly associate using userId
          items: [],
          totalPrice: 0,
        });
        cart = await AppDataSource.getRepository(Cart).save(cart);
      }
   
      const cartItemRepo = AppDataSource.getRepository(CartItem);
      let cartItem = await cartItemRepo.findOne({
        where: { cart: { id: cart.id }, medicine: { id: medicineId } },
      });
   
      if (cartItem) {
        cartItem.quantity = (cartItem.quantity ?? 0) + quantity; // Safely handle undefined quantity
        cartItem.price = cartItem.quantity * (medicine.amount ?? 0);
      } else {
        cartItem = cartItemRepo.create({
          cart,
          medicine,
          quantity,
          price: quantity * (medicine.amount ?? 0),
        });
      }
      await cartItemRepo.save(cartItem);
   
      // Recalculate cart total price
      cart = await AppDataSource.getRepository(Cart).findOneOrFail({
        where: { id: cart.id },
        relations: ["items", "items.medicine"],
      });
   
      cart.totalPrice = cart.items?.reduce((sum, item) => sum + (item.price ?? 0), 0);
      return AppDataSource.getRepository(Cart).save(cart);
    },    


    async clearCart(_: unknown, { userId }: { userId: number }): Promise<Cart> {
      const cartRepo = AppDataSource.getRepository(Cart);
   
      const cart = await cartRepo.findOne({
        where: { user: { id: userId }, checkedOut: false },
        relations: ["items"],
      });
   
      if (!cart) throw new Error("Cart not found");
   
      // Remove all items from the cart
      if (cart.items && cart.items.length > 0) {
        await AppDataSource.getRepository(CartItem).remove(cart.items);
      }
   
      cart.items = [];
      cart.totalPrice = 0;
   
      return cartRepo.save(cart);
    }
   
  },
};
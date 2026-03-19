import models from "@models";
import config from "@config";
import connectDb from "@config/db";
import Helper from "@/utils/helper";
import { PermissionLevels } from "@/utils/constants";

export async function loadDemoData() {
	try {
		console.log("Connecting to database...");
		await connectDb();

		console.log("Clearing existing data...");
		await Promise.all([
			models.User.deleteMany({}),
			models.Store.deleteMany({}),
			models.Product.deleteMany({}),
		]);

		console.log("Creating Admin user...");
		const adminPassword = await Helper.hashPassword("admin123");
		const admin = await models.User.create({
			name: "Admin User",
			email: "admin@zepkart.com",
			phone: "1234567890",
			password: adminPassword,
			permissions: [PermissionLevels.admin],
		});

		console.log("Creating Store Owner user...");
		const ownerPassword = await Helper.hashPassword("owner123");
		const owner = await models.User.create({
			name: "Store Owner",
			email: "owner@zepkart.com",
			phone: "9876543210",
			password: ownerPassword,
			permissions: [PermissionLevels.store_owner],
		});

		console.log("Creating Store...");
		const store = await models.Store.create({
			name: "Tech Haven",
			owner: owner._id,
			description: "Your one-stop shop for all things tech.",
			logo: "https://via.placeholder.com/150",
			banner: "https://via.placeholder.com/800x200",
			contact_email: "contact@techhaven.com",
			contact_phone: "9191919191",
			verified: true,
			rating: 4.5,
		});

		console.log("Creating Products...");
		const products = [
			{
				name: "UltraBook Pro",
				store: store._id,
				price: 75000,
				discount: [10, Date.now() + 86400000 * 7],
				description: "A powerful ultrabook for professionals.",
				images: ["https://via.placeholder.com/300"],
				categories: ["Electronics"],
				stock: 20,
			},
			{
				name: "SoundBlast Headphones",
				store: store._id,
				price: 5000,
				discount: [5, Date.now() + 86400000 * 3],
				description: "Noise-cancelling wireless headphones.",
				images: ["https://via.placeholder.com/300"],
				categories: ["Accessories"],
				stock: 50,
			},
			{
				name: "SmartWatch G2",
				store: store._id,
				price: 12000,
				discount: [15, Date.now() + 86400000 * 5],
				description: "Next-gen smartwatch with health tracking.",
				images: ["https://via.placeholder.com/300"],
				categories: ["Wearables"],
				stock: 30,
			},
		];

		await models.Product.insertMany(products);

		console.log("Demo data loaded successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error loading demo data:", error);
		process.exit(1);
	}
}


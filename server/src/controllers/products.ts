import type {Request, Response} from "express";


export  default class ProductsController {
    /** returns a list of products matching the query
     * @route GET /products?q=<query>&page=1&....
     * @access Public
     */
    static async getProducts(req: Request, res: Response) {}  

    /** returns a single product by id
     * @route GET /products/:id 
     * @access Public
     **/  
    static async getProductById(req: Request, res: Response) {}


    /** returns reviews for a product
     * @route GET /products/:id/reviews?page=1
     * @access Public
     */
    static async getProductReviews(req: Request, res: Response) {}

    /** creates a new product
     * @route POST /products
     * @access StoreOwner, Manager, Admin
     */
    static async createProduct(req: Request, res: Response) {}

    /** updates an existing product
     * @route PUT /products/:id
     * @access StoreOwner, Manager, Admin
     */
    static async updateProduct(req: Request, res: Response) {}
    
    /** deletes a product
     * @route DELETE /products/:id
     * @access StoreOwner, Manager, Admin
     */
    static async deleteProduct(req: Request, res: Response) {}
}
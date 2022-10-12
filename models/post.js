import db from "../config/database.js";

// Get All Posts
export const getPostTopPicks = (data, result) => {
    db.query(`
    SELECT * FROM POST A JOIN GENRE B ON A.genre_id = B.genre_id WHERE A.post_id IN (
        SELECT A.post_id FROM (
            SELECT post_id, COUNT(user_id) AS total
            FROM USER_POST_INTERACTION 
            WHERE interaction_type = 'liked' 
            GROUP BY post_id
            ORDER BY total DESC
        ) temp
    ) AND (LOWER(B.name) = LOWER(${data.genre}) OR (ISNULL(${data.genre}) OR ${data.genre} = '')) LIMIT ${data.numOfPost}
    `, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get More Posts
export const getPostsByOffsetandGenre = (data, result) => {
    db.query("SELECT * FROM POST A JOIN GENRE B ON A.genre_id = B.genre_id WHERE LOWER(B.name) = LOWER(" + data.genre + 
    ") OR (ISNULL(" + data.genre + ") OR " + data.genre + " = '') ORDER BY created_at DESC LIMIT " + data.offset + ", 12", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Insert Product to Database
export const insertProduct = (data, result) => {
    db.query("INSERT INTO product SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Update Product to Database
export const updateProductById = (data, id, result) => {
    db.query("UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?", [data.product_name, data.product_price, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Delete Product to Database
export const deleteProductById = (id, result) => {
    db.query("DELETE FROM product WHERE product_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
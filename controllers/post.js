import { getPostTopPicks, getPostsByOffsetandGenre } from "../models/post.js";
import fs from "fs";
 
export const test = (req, res) => {
    const contents = fs.readFileSync('D:/download.jpg', {encoding: 'base64'});

    res.json(contents);
}

// Get All Posts
export const showPosts = (req, res) => {
    let data = req.body;
    if (data.genre != null) {
        data.genre = "'" + data.genre + "'";
    }
    getPostsByOffsetandGenre(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Posts
export const showPostTopPicks = (req, res) => {
    let data = req.body;
    if (data.genre != null) {
        data.genre = "'" + data.genre + "'";
    }
    getPostTopPicks(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Product
export const createProduct = (req, res) => {
    const data = req.body;
    insertProduct(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Update Product
export const updateProduct = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateProductById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Delete Product
export const deleteProduct = (req, res) => {
    const id = req.params.id;
    deleteProductById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
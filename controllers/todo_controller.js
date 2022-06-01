const fs = require('fs');
const { format } = require('path');
const db = require("../db/config");
const getTodoByID = async (req, res) =>{
    const id = req.params.id
    await db
       .query("select * from todo where id="+id)
       .then((result) => {
         res.status(200).json({
           data: result.rows,
         });
       })
       .catch((e) => {
         console.log(e);
         res.status(500).json({
           message: "INTERNAL SERVER ERROR",
         });
       });    
}
const getAllTodo = async(req, res) =>{
    await db
    .query("select * from todo")
    .then((result) => {
      res.status(200).json({
        data: result.rows,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });  
}

const createTodo= async (req, res)=>{
    const newTodo = req.body
    await db
    .query(`insert into todo(id, name, done) values(${newTodo.id},'${newTodo.name}',${newTodo.done});`)
    .then((result) => {
      res.status(200).json({
        message : "berhasil update todo",
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
}

const updateTodo = async (req, res) => {
    const udpatedTodo = req.body
    const id = req.params.id

    await db
    .query(`update todo set name='${udpatedTodo.name}', done=${udpatedTodo.done} where id=${id};`)
    .then((result) => {
      res.status(200).json({
        message : "berhasil update data",
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
}
const deleteTodo = async (req, res) => {
    const id = req.params.id
    await db
    .query(`delete from todo where id=${id};`)
    .then((result) => {
      res.status(200).json({
        message : "berhasil delete data",
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
}

module.exports = {
    getAllTodo, getTodoByID, createTodo, updateTodo, deleteTodo
}
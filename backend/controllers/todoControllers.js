import Todo from "../models/Todo.js"

export async function createTodo(req, res){
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export async function getTodos(_, res){
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

export async function updateTodo(req, res){
    try {
        const update = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(update)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export async function deleteTodo(req, res){
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" })
    } catch (error) {
        
    }
}
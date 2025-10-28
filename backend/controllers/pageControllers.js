export async function homePage(req, res){
    try {
        res.sendFile("index.html", { root: "../frontend" } );
    } catch (error) {
        res.status(404).json({ err: "page not found" });
    }
}
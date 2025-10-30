        async function index(){
            const res = await fetch("/api/todos");
            const data = await res.json();
            console.log(data);
            const list = document.querySelector(".list");
            data.forEach(element => {
            const listItem = document.createElement("div");
            listItem.dataset.id=`${element._id}`;
            listItem.classList.add("list-item");
            listItem.innerHTML = `
                <div>
                    <input type="checkbox" name="" id="" ${element.completed? "checked" : ""}>
                    <span>${element.title}</span>
                </div>
                    <span class="del">del</span>
            `;
            list.appendChild(listItem);
            });
            
        }

        async function check(e){
            if(e.target.type !== "checkbox") return;
            const listItem = e.target.closest(".list-item");
            const id = listItem.dataset.id;
            const completed = e.target.checked;

            try {
                const res = await fetch(`/api/todos/${id}`,{
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ completed })
                });

                const data = await res.json();
                console.log(data);
            } catch (error) {
                console.log("fail to put data", error);
            }
        }

        async function add(){
            const bar = document.querySelector(".bar");
            const input = bar.value;
            if(!input) return;
            bar.value = "";
            console.log(input);

            try {
                const res = await fetch("/api/todos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: input })
                });
                const data = await res.json();
                console.log("added this element: ", data.title);
                const listItem = document.createElement("div");
                listItem.classList.add("list-item");
                listItem.dataset.id = data._id;
                listItem.innerHTML = `
                    <div>
                        <input type="checkbox" name="" id="" ${data.completed? "checked" : ""}>
                        <span>${data.title}</span>
                    </div>
                        <span class="del">del</span>
                `;
                document.querySelector(".list").appendChild(listItem);
            } catch (error) {
                
            }
        }

        async function deleteItem(e){
            if(!e.target.classList.contains("del")) return;
            const listItem = e.target.closest(".list-item");
            const id = listItem.dataset.id;
            try {
                const res = await fetch(`/api/todos/${id}`, {
                    method: "DELETE",
                });

                if(!res.ok){
                    throw new Error("failed to delete item");
                }

                listItem.remove();
                console.log(`Deleted todo: ${id}`);
            } catch (error) {
                console.log("failed to delted item: ", error)
            }
        }

        

        document.querySelector(".list").addEventListener("change", check);
        document.querySelector(".list").addEventListener("click", deleteItem);

        document.querySelector(".add").addEventListener("click", add);

        window.addEventListener("DOMContentLoaded", index);
        
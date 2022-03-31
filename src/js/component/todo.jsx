import React from "react";
import { useState, useEffect } from "react";

const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";

const Todos = () => {
	const [todo, setTodo] = useState("");

	const [todoList, setTodoList] = useState([]);

	const [error, setError] = useState(false);

	const handleChange = (event) => {
		setTodo(event.target.value);
	};

	const handleKeypress = (event) => {
		if (todo.trim() != "") {
			if (event.key === "Enter") {
				setTodoList([...todoList, todo]);
				// setTodo("");
				setError(false);
			}
		} else {
			setError(true);
		}
	};

	const handleDelete = (id) => {
		const newTodoList = todoList.filter((item, index) => id != index);
		setTodoList(newTodoList);
	};

	async function getTodos() {
		try {
			let response = await fetch(`${URL_BASE}/GabrielPerez`, {
				mode: "cors",
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});

			if (response.ok) {
				// let results = await response.json();
				console.log(response);
				// setTodoList(results);
			} else {
				console.log("else");
				newUser();
			}
		} catch (error) {
			console.log(error);
		}
	}

	function newUser() {
		fetch(`${URL_BASE}/GabrielPerez`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify([]),
		}).then((response) => {
			if (response.ok) {
				getTodos();
			} else {
				alert("fallo el codigo");
			}
		});
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="row justify-content-center flex-column">
			<div className="container col-4">
				<ul className="list-group">
					<li className="list-group-item">
						<input
							className="entrada"
							type="text"
							placeholder="Wha needs to be done?"
							value={todo}
							onChange={handleChange}
							onKeyPress={handleKeypress}
						/>
					</li>
				</ul>
			</div>

			{error && (
				<div className="alert alert-danger">
					El campo no puede estar vacio
				</div>
			)}

			<div className="container col-4">
				{todoList.map((item, index) => {
					return (
						<li className="list-group-item todos" key={index}>
							{item.label}
							<div
								className="borrar"
								onClick={() => handleDelete(index)}>
								X
							</div>
						</li>
					);
				})}
				<li className="list-group-item">{todoList.length} item left</li>
			</div>
		</div>
	);
};
export default Todos;

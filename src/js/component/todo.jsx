import React from "react";
import { useState, useEffect } from "react";
const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";
const initialState = { label: "", done: false };
const Todos = () => {
	const [todo, setTodo] = useState(initialState);
	const [todoList, setTodoList] = useState([]);
	const [error, setError] = useState(false);
	const handleChange = (event) => {
		setTodo({ ...todo, [event.target.name]: event.target.value });
	};
	const handleKeypress = (event) => {
		if (event.key === "Enter") {
			putTodo();
			getTodos();
		}
	};

	async function getTodos() {
		try {
			let response = await fetch(`${URL_BASE}/GabrielPerez`);
			let results = await response.json();
			if (response.ok) {
				setTodoList(results);
			} else {
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

	const putTodo = async () => {
		try {
			if (todo.label.trim() != "") {
				let response = await fetch(`${URL_BASE}/GabrielPerez`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([...todoList, todo]),
				});
				if (response.ok) {
					getTodos();
					setError(false);
				} else {
					console.log(response.status);
				}
			} else {
				setError(true);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			let newListTodo = todoList.filter((item, index) => index != id);
			let response = await fetch(`${URL_BASE}/GabrielPerez`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newListTodo),
			});
			if (response.ok) {
				getTodos();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteList = async () => {
		try {
			let response = await fetch(`${URL_BASE}/GabrielPerez`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				alert("su lista fue eliminada correctamente");
				getTodos();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);
	return (
		<div className="row justify-content-center flex-column">
			<div className="container col-4">
				<ul className="list-group">
					<li className="list-group-item">
						{
							<input
								className="entrada"
								type="text"
								placeholder="Wha needs to be done?"
								name="label"
								value={todo.label}
								onChange={handleChange}
								onKeyPress={handleKeypress}
							/>
						}
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
								onClick={() => deleteTodo(index)}>
								X
							</div>
						</li>
					);
				})}
				<li className="list-group-item">{todoList.length} item left</li>
				<button
					type="button"
					className="btn btn-success mt-2"
					onClick={() => deleteList()}>
					borrar lista
				</button>
			</div>
		</div>
	);
};
export default Todos;

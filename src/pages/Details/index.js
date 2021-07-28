import './styles.css'
import { FaArrowLeft } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import {Link, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Details = ({history}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getTask();
    }, []);

    const notify = () => toast("Atualizado com sucesso!!", {type: 'success'});

    const getTask = async () => {
        const task = await axios.get(process.env.REACT_APP_API_URL + id);
        setTitle(task.data.title);
        setDescription(task.data.description);
        const formattedDate = new Date(task.data.date);
        setDate(formattedDate);
        console.log(task);
    }

    const removeTask = async () => {
        await axios.delete(process.env.REACT_APP_API_URL + id);
        alert('Usuário deletado com sucesso!');
        history.push('/');
    }

    const updateTask = async () =>{
        await axios.put(process.env.REACT_APP_API_URL + id, {
            title,
            description,
            date,
        })
        notify();
    }

    return (
        <div className="container-details">
            <ToastContainer />
            <div className="subcontainer-details">

                <div className="container-header">
                    <Link to='/'>
                        <FaArrowLeft/>
                        <span>Voltar</span>
                    </Link>
                </div>

                <input value={title} placeholder="Titulo" onChange={(txt)=>setTitle(txt.target.value)}/>
                        <textarea value={description} placeholder="Descrição" onChange={(txt)=>setDescription(txt.target.value)}/>
                        <DatePicker selected={date} onChange={(txt)=>setDate(txt)} dateFormat="dd/MM/yyyy" />
                        
                <div className="container-buttons">
                    <button onClick={updateTask}>Salvar</button>
                    <button onClick={removeTask}>Excluir</button>
                </div>

            </div>
        </div>
    )
}

export default Details;
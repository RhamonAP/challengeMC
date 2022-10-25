import { useForm } from "react-hook-form";
import './styles.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputMask from 'react-input-mask';
import Axios from 'axios';



  const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    birth: yup.string("A data de nascimento é obrigatória").required("A data de nascimento é obrigatória"),
    email: yup.string().email().required("O email é obrigatório"),
    country: yup.string().required("O país é obrigatório"),
    cep: yup.string("O CEP é obrigatório").required("O CEP é obrigatório"),
    uf: yup.string().required("UF é obrigatório"),
    city: yup.string().required("A cidade é obrigatória"),
    district: yup.string().required("O bairro é obrigatório"),
    adress: yup.string().required("O endereço é obrigatório"),
    number: yup.number().positive().integer(),
  }).required();

  function App() {
    const {register, handleSubmit, setValue, getValues, setFocus, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const checkCEP = (e) => {
      const cep = e.target.value.replace(/\D/g, '');
      fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setValue('adress', data.logradouro);
      setValue('district', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setFocus('number');
    });
  }
  const onSubmit = () => {   
    Axios.post("http://localhost:3001/register", {
      name: getValues("name"),
      birth: getValues("birth"), 
      email: getValues("email"), 
      country: getValues("country"), 
      cep: getValues("cep"), 
      uf: getValues("uf"), 
      city: getValues("city"), 
      district: getValues("district"), 
      adress: getValues("adress"), 
      number: getValues("number"),     
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error)
    })
  }
  
  return (
    <div className="container">
      <h1 className="title">Registrador de pacientes</h1>
      <form onSubmit={handleSubmit(onSubmit)} method="post"> 
        <div className="containerInput">
          <div className="row-form">
            <div className="name">
              <label>Nome *</label>
              <input type="text" placeholder="Digite o seu nome" {...register("name")} />
              <span>{errors.name?.message}</span> 
            </div>   
          </div>       
            <div className="row-form">
              <div className="container-date-email">
                <div className="date">
                  <label>Data de Nascimento *</label>
                  <input type="date" {...register("birth")}/>
                  <span>{errors.birth?.message}</span>
                </div>
                <div className="email">
                  <label>E-mail *</label>
                  <input type="text" placeholder="email@email.com" {...register("email")}/>
                  <span>{errors.email?.message}</span> 
                </div>                                           
              </div>                       
          </div>         
          
          <div className="row-form">
            <div className="container-adress01">
              <div className="country">
                <label>País *</label>
                <input type="text" placeholder="Digite o seu país" {...register("country")}/>
                <span>{errors.country?.message}</span>          
              </div>
              
              <div className="CEP">
                <label>CEP *</label>
                <InputMask type="text" mask="99999-999" placeholder="Ex.: 00000-000"  {...register("cep")} onBlur={checkCEP} />
                <span>{errors.cep?.message} </span>          
              </div>
              
              <div className="UF">
                <label>UF *</label>
                <input type="text" placeholder="UF" {...register("uf")} maxLength={2} oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/>
                <span>{errors.uf?.message}</span>          
              </div>
              
              <div className="city">
                <label>Cidade *</label>
                <input type="text" placeholder="Digite sua cidade" {...register("city")}/>
                <span>{errors.city?.message}</span>          
              </div>
              
              <div className="district">
                <label>Bairro *</label>
                <input type="text" placeholder="Digite o seu bairro" {...register("district")}/>
                <span>{errors.district?.message}</span>          
              </div>
            </div>            
          </div>          
          
          <div className="row-form">
            <div className="container-adress02">
              <div className="adress">
              <label>Endereço *</label>
              <input type="text" placeholder="Rua " {...register("adress")}/>
              <span>{errors.adress?.message}</span>          
            </div>
          
            <div className="number">
              <label>Número</label>
              <input type="number" placeholder="Número" {...register("number")}/>
            </div>            
            </div>            
          </div>
          <div className="row-button">            
            <div className="buttonSave">
              <Button startIcon={<SaveIcon />} variant="contained" type={onSubmit}>
                Save
              </Button>                      
            </div>
            <div className="label-legend">
              <label>* Campos obrigatórios</label>
            </div>  
          </div>
          
        </div>
      </form>
    </div>
  );
}

export default App;

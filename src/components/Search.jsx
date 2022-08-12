import axios from 'axios';
import React, {useRef,useState} from 'react'
import noEncontrado from '../assets/images/noEncontrado.jpg'
const URL_SEARCH='http://openlibrary.org/search.json?q='
const URL_COVER='https://covers.openlibrary.org/b/id/'
const COVER_SIZE='-M.jpg'

const Search=()=>{
    const titulo = useRef(null);
    //Cogemos el valor del input en un state
    const [valorEscogido, setValorEscogido]=useState("")
    //Resultado del array de la petición en un state
    const [dato, setDato]=useState([])
    
    
    const handleChange=()=>{
        //Cogemos los valores del input a través de useRef y con el evento onChange
        const valor=titulo.current.value;
        let newValue=""
        for( let letra of valor){
            //En la api las palabras del título van separadas por el símbolo +
            if(letra===" "){
                letra="+"
            }
            newValue+=letra;
        }
        setValorEscogido(newValue)
        apiLibros()
    }

    
        const apiLibros=()=>{
            axios.get(URL_SEARCH+valorEscogido)
            .then((res)=>{
                //filtra los libros con una sóla edición
                setDato(res.data['docs'].filter(book=>book.edition_count===1))
            })

        };
        
    
    return(
        <section className="containerBuscador">
        
            <h1>Buscador de libros</h1>
            <br></br>
            <p>
                    <label htmlFor='busqueda'>Introduce un libro &nbsp;&nbsp;</label>
            </p>
            <div className="input-group rounded" id="buscador">
                
                    <input type="search"
                        ref={titulo}
                        onChange={handleChange}
                        className="form-control rounded"
                        placeholder="Search" 
                        aria-label="Search" 
                        aria-describedby="search-addon"
                        required />
                    <span className="input-group-text border-0" id="search-addon" onClick={handleChange}>
                        <i className="fas fa-search" ></i>
                    </span>
                
                
            </div>

            <div id="resultado">
                {dato.map((i)=>{
                    /*Se imprimen los resultados en un menú horizontal que se puede hacer scroll con el ratón*/
                    return(
                        <div className="jumbotron" key={i.key} id="hijoResultado">
                            
                            <h1 className="display-4">{i.title}</h1>
                            <p className="lead">{i.author_name}</p>
                            <hr className="my-4"></hr>
                            <p>{i.first_publish_year}</p>
                            {(()=>{
                                if (i.cover_i==null)
                                    return <img src={noEncontrado}  width="200" height="200" alt="cover"/>
                                else 
                                    return <img src={URL_COVER+i.cover_i+COVER_SIZE} alt="cover"/>
                            })()}
                            
                        </div>
                    )
                })
                }
                        
            </div>
        </section>
    )
}
export default Search
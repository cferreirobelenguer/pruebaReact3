import React, {useRef,useState} from 'react'

const Search=()=>{
    const titulo = useRef(null);
    //Cogemos el valor del input en un state
    const [valorEscogido, setValorEscogido]=useState("")
    const [title, setTitle]=useState("")
    const [autor, setAutor]=useState("")
    const [fecha, setFecha]=useState("")
    const [portada, setPortada]=useState("")
    
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
        console.log("El valor del input es: "+valorEscogido)
        apiLibros()
    }

    
        const apiLibros=()=>{
            fetch('http://openlibrary.org/search.json?q='+valorEscogido)
            .then((res)=>res.json())
            .then((data)=>{
                
                setTitle(data.docs[0].title)
                setAutor("Autor: "+data.docs[0].author_name)
                setFecha("Primer año de publicación: "+data.docs[0].first_publish_year)
                setPortada("https://covers.openlibrary.org/b/isbn/"+data.docs[0].isbn+"-S.jpg")
                console.log("Título: "+data.docs[0].title)
                console.log("Autor: "+data.docs[0].author_name)
                console.log("Primer año de publicación: "+data.docs[0].first_publish_year)
                console.log("Portada: "+data.docs[0].isbn)
                
            })
        };
        
    
    return(
        <div className="containerBuscador">
            <h1>Buscador de libros</h1>
            <div className="input-group rounded" id="buscador">
                
                
                <input type="search"
                        ref={titulo}
                        onChange={handleChange}
                        className="form-control rounded"
                        placeholder="Search" 
                        aria-label="Search" 
                        aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon" onClick={handleChange}>
                    <i className="fas fa-search" ></i>
                </span>
            </div>

            <div id="resultado">
                        <div className="jumbotron">
                            <h1 className="display-4">{title}</h1>
                            <p className="lead">{autor}</p>
                            <hr className="my-4"></hr>
                            <p>{fecha}</p>
                        </div>
            </div>
        </div>
    )
}
export default Search
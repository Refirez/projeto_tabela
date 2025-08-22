export default async function Pokedex() {
    
    const dados = await fetch ('https://pokeapi.co/api/v2/pokemon/100/')
    const pokemon = await dados.json()
  

    return ( <table>
        <thead>
            <tr>
                    <th>ID</th>
                    <th>Nome</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{pokemon.id}</td>
                    <td>{pokemon.name}</td>
                   
            </tr>
        </tbody>
            </table>

    )

}
import { createClient } from "@/lib/supabase/server"
export default async function Prueba(){

    const supabase = await createClient();

    const{data: products, error} = await supabase
    .from ('products')
    .select('*')

    if(error){
        console.error('error al hacer fetch:', error.message);
    }


    return(
        <div>
            <h1>Lista de productos prueba</h1>
            <ul>
                {products?.map((productos)=>(
                    <li key={productos.id}>
                        {productos.name}
                    </li>
                ))}
            </ul>

        </div>
    )

}
import ProductCatalog from "@/components/ui/products/ProductCatalogue";
import ProductForm from "@/components/ui/products/ProductForm";

export default function Inventory(){

    const isSupplier = true;// esto se cambiara despues cuando haya login y backend
    return(

        <div>
        {isSupplier ?
            (
                    <ProductForm/>
            ):(
                <ProductCatalog/>
            )
            }

            </div>
           
    )
}
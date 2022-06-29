import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

// Carrega o código de AddProductToWishList, somente se o usuário fizer uma ação. No caso, "Adicionar aos favoritos".
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => { 
  return import("./AddProductToWishlist").then(
    (mod) => mod.AddProductToWishlist // o mod é usado para poder utilizar o export function em vez do export default
  );
}, {
    loading: () => <span>Carregando...</span>
});

interface ProductItemProps {
  products: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} = <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

// O memo evita que o React crie uma nova versão do componente, se ele não tiver nenhuma prop alterada.
// O mesmo faz uma shadow compare(comparação rasa).
// Quando uma prop tem objetos ou algo que a comparação pode ser feita usando ===, o memo precisa de um segundo parâmetro.
// prevProps = são propriedades que eu tinha antes da renderização
// nextProps = novas propriedades depois da nova renderização
// O Object.is compara cada uma das props em ProductItemProps. Deve ser usado com cuidado, apenas se os dados retornados não forem muito complexos.

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

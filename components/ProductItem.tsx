import { memo } from "react";

interface ProductItemProps {
  products: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }) {
  return (
    <div>
      {product.title} = <strong>{product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>
        Add to wishlist
      </button>
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

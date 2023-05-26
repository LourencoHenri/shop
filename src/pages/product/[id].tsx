import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta</h1>
        <span>R$ 79,90</span>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis reiciendis corrupti ipsum exercitationem nisi quam quae minima officiis. Impedit rem sequi vero quaerat earum praesentium minima placeat repudiandae a quos?</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
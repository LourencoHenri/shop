import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import shirt1 from "../assets/shirts/shirt1.png"
import shirt2 from "../assets/shirts/shirt2.png"
import shirt3 from "../assets/shirts/shirt3.png"
import shirt4 from "../assets/shirts/shirt4.png"
import { useEffect, useState } from "react"
import { stripe } from "../lib/stripe"
import { GetServerSideProps, GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
  }[]
}

export default function Home({ products }: HomeProps) {

  const [list, setList] = useState<number[]>([])

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setList([1, 2, 3])
    }, 5000)
  }, [])

  return (
    <HomeContainer ref={sliderRef} className="keen-slider" >

    {products.map((product) => {
      return (
        <Link href={`/product/${product.id}`} key={product.id} >
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} alt="" width="520" height="480" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      )
    })}

    </HomeContainer>
  )
}

export const getStaticProps : GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })
 
  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    const formattedPrice = price.unit_amount === null ? 0 : price.unit_amount / 100

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(formattedPrice),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
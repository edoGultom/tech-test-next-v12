import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardProduct from "../../../components/CardProduct";
import Layout from "../../../components/Layout";
import TableProduct from "../../../components/TableProduct";

export async function getServerSideProps(context) {
  const { query } = context;

  if (Object.keys(query).length > 0) {
    const response = await fetch(
      `${process.env.NEXT_SERVER_API_URL}/read?kategori=${query.kategori}&operator=${query.operator}`
    );
    const data = await response.json();
    return {
      props: {
        products: data.query,
      },
    };
  }
  return {
    props: {
      products: {},
    },
  };
}

export default function Filters({ products }) {
  const router = useRouter();
  const { kategori, operator } = router.query;
  console.log(products);

  // useEffect(() => {
  //   if (router.isReady) setLoading(true);
  //   const { page, limit } = router.query;
  //   setPage(page);
  //   setLimit(limit);
  //   setLoading(false);
  // }, [router.isReady, router.query]);

  // if (router.isReady) {
  //   return <p>Loading...</p>;
  // }
  return (
    <Layout>
      <CardProduct tabName="Semua Produk" params={router.query}>
        <TableProduct data={products} />
      </CardProduct>
    </Layout>
  );
}
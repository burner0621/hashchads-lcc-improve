import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getProducts } from '../../../../../redux/slices/product';
// routes
import { PATH_HASHCHADS } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../../sections/@hashchads/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

EcommerceProductEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductEdit() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { name } = query;

  const { products } = useSelector((state) => state.product);

  const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Edit product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Hashchads', href: PATH_HASHCHADS.root },
            {
              name: 'E-Commerce',
              href: PATH_HASHCHADS.eCommerce.root,
            },
            { name: name },
          ]}
        />

        <ProductNewEditForm isEdit currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}

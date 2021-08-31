import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
  const { userType = '', userName = '' } = props;
  let prefix = '';
  console.log(prefix);

  if (userType === 'customer') {
    prefix = 'customer_products__';
  }

  if (userType === 'seller') {
    prefix = 'seller_orders__';
  }

  if (userType === 'admin') {
    prefix = 'admin_manage__';
  }

  return (
    <header>
      <ul>
        { userType === 'customer' && (
          <>
            <li>
              <NavLink
                to="/customer/products"
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customer/orders"
                data-testid="customer_products__element-navbar-link-orders"
              >
                Meus pedidos
              </NavLink>
            </li>
          </>
        ) }
        { userType === 'seller' && (
          <li>
            <NavLink
              to="/seller/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus pedidos
            </NavLink>
          </li>
        ) }
        { userType === 'admin' && (
          <li>
            <a
              href="/admin/manage"
              data-testid="customer_products__element-navbar-link-manage"
            >
              Gerenciar usuários
            </a>
          </li>
        ) }
        <div>

          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userName }
          </li>
          <li>
            <a
              href="/login"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </a>
          </li>
        </div>
      </ul>
    </header>
  );
}

NavBar.propTypes = {
  userType: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default NavBar;

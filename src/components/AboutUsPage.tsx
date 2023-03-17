import React, { Component } from 'react';
import { Header } from './Header';

export class AboutUsPage extends Component {
  render() {
    return (
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="container flex flex-col justify-center mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="mb-4">
            We are a product shop that specializes in offering high-quality and unique products for
            all your needs. Our mission is to provide our customers with the best possible shopping
            experience, from the moment they visit our website to the moment they receive their
            order.
          </p>
          <p className="mb-4">
            Our team is dedicated to sourcing and curating the best products from around the world.
            We work with suppliers who share our values of quality, sustainability, and ethical
            production. We believe in supporting small businesses and independent makers, and many
            of our products are handcrafted by skilled artisans.
          </p>
          <p className="mb-4">
            At Product Shop, we are more than just a store. We are a community of passionate
            individuals who love discovering new products and sharing them with others. We are
            always here to help, whether you have a question about a product or just want to chat.
          </p>
          <p className="mb-4">
            Thank you for choosing Product Shop. We hope you enjoy our products as much as we do.
          </p>
        </div>
      </div>
    );
  }
}

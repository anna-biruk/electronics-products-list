import React, { Component } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { SearchInput } from './SearchInput';

interface NavItemProps extends NavLinkProps {
  label: string;
  exact?: boolean;
}
type Props = {
  search?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit?: (event: React.SyntheticEvent) => void;
};

export const Header = ({ search, handleSearch, handleSearchSubmit }: Props) => {
  return (
    <nav className="flex justify-between mr-10 text-xl h-[70px] items-center sm:flex-wrap sm:justify-center">
      <div className="ml-20">
        {handleSearch && search !== undefined && (
          <SearchInput
            handleSearch={handleSearch}
            search={search}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </div>
      <div className="flex justify-end gap-4 ">
        <NavItem to="/" label="Home" />
        <NavItem to="/about" label="About" />
        <NavItem to="/forms" label="Forms" />
      </div>
    </nav>
  );
};

class NavItem extends Component<NavItemProps> {
  render() {
    const { label, ...rest } = this.props;
    return (
      <NavLink {...rest} className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
        {label}
      </NavLink>
    );
  }
}

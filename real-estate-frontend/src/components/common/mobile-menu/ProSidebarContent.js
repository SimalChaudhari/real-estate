import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";

const ProSidebarContent = () => {
  const pathname = usePathname();
  const path = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };



  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        <ul className="justify-content-center">

          <li className="visible_list dropitem py-2 active">
            <a className="list-item" href="#">
              <span className={topMenu == "home" ? "title menuActive" : "title"}>
                <Link className={`${handleActive('/')}`} href="/">
                  Home
                </Link>
              </span>
            </a>
          </li>

          <li className="visible_list dropitem py-2 active">
            <a className="list-item" href="#">
              <span className={topMenu == "home" ? "title menuActive" : "title"}>
                <Link className={`${handleActive('/list-v1')}`} href="/list-v1">
                  Listing
                </Link>
              </span>
            </a>
          </li>

          <li className="visible_list dropitem py-2 active">
            <a className="list-item" href="#">
              <span className={topMenu == "home" ? "title menuActive" : "title"}>
                <Link className={`${handleActive('/about')}`} href="/about">
                  About
                </Link>
              </span>
            </a>
          </li>

          <li className="visible_list dropitem py-2 active">
            <a className="list-item" href="#">
              <span className={topMenu == "home" ? "title menuActive" : "title"}>
                <Link className={`${handleActive('/contact')}`} href="/contact">
                  Contact Us
                </Link>
              </span>
            </a>
          </li>

          <li className="visible_list dropitem py-2 active">
            <a className="list-item" href="#">
              <span className={topMenu == "home" ? "title menuActive" : "title"}>
                <Link className={`${handleActive('/faq')}`} href="/faq">
                  Faq
                </Link>
              </span>
            </a>
          </li>

        </ul>



        {/*
          {mobileMenuItems.map((item, index) => (
            <SubMenu
              key={index}
              className={isParentActive(item.subMenu, path) ? "active" : ""}
              label={item.label}
            >
              {item.subMenu.map((subItem, subIndex) =>
                subItem.subMenu ? (
                  <SubMenu
                    key={subIndex}
                    label={subItem.label}
                    className={
                      isParentActive(subItem.subMenu, path) ? "active" : ""
                    }
                  >
                    {subItem.subMenu.map((nestedItem, nestedIndex) => (
                      <MenuItem
                        key={nestedIndex}
                        component={
                          <Link
                            className={nestedItem.path == path ? "active" : ""}
                            href={nestedItem.path}
                          />
                        }
                      >
                        {nestedItem.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={subIndex}
                    component={
                      <Link
                        className={subItem.path == path ? "active" : ""}
                        href={subItem.path}
                      />
                    }
                  >
                    {subItem.label}
                  </MenuItem>
                )
              )}
            </SubMenu>
          ))}
          */}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;

import {  useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import { motion } from "framer-motion";

import Blog from "./Blog";
import useBlogCategory from "../../../hooks/use-fetch-blog-categories";
import useDimensions from "../../../hooks/use-dimensions";

import styles from "./all-blogs.module.css";
import "swiper/css";
import Img from "../../utils/image/Img";

const breakpoint = {
  mobile:600
}

const AllBlogs = () => {
  const {width} = useDimensions();
  const [isHover, setIsHover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const productPerPage = 6;
  const { message, blogs, categories, loading } = useBlogCategory(
    currentPage,
    productPerPage,
    searchQuery,
    category
  );
  // handlers
  const handleSearchInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchVal(e.target.value);
    
  };
  const handleClickOnSearchBtn = () => {
    setSearchQuery(searchVal);
    setCurrentPage(1);
  };

  return (
    <section className={styles.all_blogs} style={{ position: "relative" }}>
      <div className={styles.wrapper}>
        <h1 className={styles.section_title + " heading__primary"}>
          More Tech-savvy reads for the modern world
        </h1>
        <div className={`${styles.search_area + " container"}`}>
          <div
            className={styles.search_bar + `${loading ? " not_allowed" : ""}`}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchInputOnChange}
              onKeyPress={(e: any) =>
                e.key === "Enter" && handleClickOnSearchBtn()
              }
            />
            <motion.div
              className={styles.arrows_wrapper}
              onHoverStart={() => setIsHover(true)}
              onHoverEnd={() => setIsHover(false)}
              onClick={handleClickOnSearchBtn}
            >
              <motion.div
                className={styles.arrows}
                animate={
                  isHover
                    ? {
                        y: "-1.5vw",
                        x: "-0.4vw",
                      }
                    : { y: "0.3vw", x: "-0.48vw" }
                }
                transition={{ duration: 0.3 }}
              >
                <div className={styles.outlineArrowBox}>
                
                    <Img 
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}svg/search.svg`}
                      alt="Internet service provider"
                      sizes={{
                        default: [2,2],
                        mobile: [19.4,16],
                      }}
                    />
                </div>
                <div className={styles.darkArrowBox}>
                  <Img 
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}svg/search.svg`}
                      alt="Internet service provider"
                      sizes={{
                        default: [2,2],
                        mobile: [19.4,16],
                      }}
                    />
                </div>
              </motion.div>
            </motion.div>
          </div>
          <div
            className={styles.categories + `${loading ? " not_allowed" : ""}`}
          >
            {categories?.length > 0 && (
              <Swiper
                className="categries_slider"
                slidesPerView={width < breakpoint.mobile ? 4 : 6}
                modules={[Autoplay]}
                autoplay={{ delay: 2500 }}
              >
                <SwiperSlide>
                  <button
                    onClick={() => {
                      setCategory("");
                      setCurrentPage(1);
                    }}
                    className={category === "" ? styles.active : ""}
                  >
                    All
                  </button>
                </SwiperSlide>
                {categories?.map((c: any) => (
                  <SwiperSlide key={c._id}>
                    <button
                      onClick={() => {
                        setCategory(c._id);
                        setCurrentPage(1);
                      }}
                      className={category === c._id ? styles.active : ""}
                    >
                      {c.name}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>

        {message && !loading && <h1 className={styles.message}>{message}</h1>}
        {blogs?.length > 0 && (
          <>
            <div className={styles.blogs}>
              {blogs.length > 0 &&
                blogs?.map((b: any) => (
                  <Blog
                    key={b._id}
                    id={b._id}
                    heading={b.title}
                    createdAt={b.created_at}
                    category={b.category}
                    readTime={b.read_time}
                    image={b.image}
                    excerpt={b.excerpt}
                    slug={b.slug}
                  />
                ))}
            </div>
            {!loading && (
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev: number) => {
                      if (prev !== 1) {
                        return prev - 1;
                      }
                      return prev;
                    })
                  }
                >
                  <Img 
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}svg/arrow_up_b.svg`} 
                    alt="scroll up" 
                    sizes={{
                      default: [2.5,2.5],
                      mobile: [3,6],
                    }} 
                  />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev: number) => {
                      if (!(blogs.length < productPerPage)) {
                        return prev + 1;
                      }
                      return prev;
                    })
                  }
                >
                  <Img 
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}svg/arrow_up_b.svg`} 
                    alt="scroll up" 
                    sizes={{
                      default: [2.5,2.5],
                      mobile: [3,6],
                    }}
                  />
                </button>
              </div>
            )}
          </>
        )}
        {loading && (
          <div style={{ marginTop: "4vw", display: "flex", justifyContent: "center", alignItems: "center"}} className="loader">
            <Img 
             src={`${process.env.NEXT_PUBLIC_IMAGES_URL}svg/loader.svg`} 
             alt="loader"
              sizes={{
                default: [16.5,6],
                mobile: [19.4,16],
              }}
             />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;

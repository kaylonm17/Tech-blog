module.exports = {
   format_time: (date) => {
     return date.toLocaleTimeString();
   },
   format_date: (date) => {
     return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
       new Date(date).getFullYear()
     }`;
   },
   format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  
  /* 
    this helper will only show 10 words from the "tech_description"
  */
  tech_description_trim: (str) => {
    const word_count = str.split(' ').length;

    if(word_count <= 10){
      return str.split(/\s+/).slice(0,10).join(" ");
    } else {
      return str.split(/\s+/).slice(0,10).join(" ") + ' ...';
    }
  },
  get_random_image: ()=> {
    const imagesSrcArr = [
      "/images/alex-azabache-V83v-MYB_Z8-unsplash.jpg",
      "/images/caroline-selfors-r2jpr8MDw0I-unsplash.jpg",
      "/images/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg",
      "/images/dino-reichmuth-A5rCN8626Ck-unsplash.jpg",
      "/images/fabio-comparelli-uq2E2V4LhCY-unsplash.jpg",
      "/images/ian-dooley-DuBNA1QMpPA-unsplash.jpg",
      "/images/jack-anstey-XVoyX7l9ocY-unsplash.jpg",
      "/images/Lake-Mountains_VZBJUVPO25.jpg",
      "/images/luca-bravo-O453M2Liufs-unsplash.jpg",
      "/images/stefan-stefancik-0wMmxNB6Xzc-unsplash.jpg"
     ]
    return imagesSrcArr[Math.floor(Math.random()*imagesSrcArr.length)]
  }
 };
 
<template>
  <div class="hello container" id="app">
    <h1>{{ msg }}</h1>

    <input type="file" @change="uploadPhoto" />
    <div class="inputs">
      <input type="text" placeholder="Full name" v-model="details.name" class="input" @input="updateTextOverlay" />

      <input type="text" placeholder="Course" v-model="details.course" class="input" @input="updateTextOverlay" />

      

    </div>
    <canvas ref="canvas" width="500" height="500" class="canvas"></canvas>
    <button @click="downloadImage" class="button">Download Photo</button>

    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://www.linkedin.com/in/jekayinoluwa/" target="_blank" rel="noopener">Say Hi to me</a></li>
      <li><a href="https://gdg.community.dev/gdg-on-campus-kwara-state-university-malete-nigeria/" target="_blank" rel="noopener">GDSC KWASU</a></li>
    </ul>
    
  </div>
</template>

<script>
import { fabric } from "fabric";


export default { 

  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      details: {
        name: "",
        course: "",
        
      },
      canvas: null,
    };
  },

  methods: {
    uploadPhoto(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;

        if(!this.canvas) {
          this.canvas = new fabric.Canvas(this.$refs.canvas);
        }

        fabric.Image.fromURL(imageSrc, (img) => {
          img.scaleToWidth(this.canvas.width);
          this.canvas.clear(); // Clear previous uploads
          img.set({
            selectable: false,
          });
          this.canvas.add(img);

          // Add Banner
          const banner = new fabric.Rect({
            left: 0,
            top: this.canvas.height - 50,
            fill: "#01796f",
            width: this.canvas.width,
            height: 50,
            selectable: false,
          });
          this.canvas.add(banner);

          // add the input texts
          this.addTextOverlay();
        });
      };
      reader.readAsDataURL(file);
  },

  addTextOverlay() {
    const text = new fabric.Text(
      `${this.details.name || "Full Name"} | ${this.details.course || "Course"}`,
      {
        left: 10,
        top: this.canvas.height - 40,
        fill: "white",
        fontSize: 16,
        selectable: false,
      }
    );
    this.bannerText = text;
    this.canvas.add(text);
  },

  updateTextOverlay() {
    if (this.bannerText) {
      this.bannerText.text = `${this.details.name || "Full Name"} | ${this.details.course || "Course"}`;
      this.canvas.renderAll();
    }
  },

  downloadImage() {
    if (this.canvas) {
      const url = this.canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "graduation-banner.png";
      link.href = url;
      link.click();
    }
  },
  },
};
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}



.container {
  text-align: center;
  max-width: 600px;
  margin: auto;
}
.input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
}
.canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
}
.button {
  background-color: #2c6eec;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}
</style>

<template>
  <div class="hello container" id="app">
    <h1>{{ msg }}</h1>

    <input type="file" @change="uploadPhoto" />
    <div class="inputs">
      <input
        type="text"
        placeholder="Firstname Lastname Surname"
        v-model="details.name"
        class="input"
        @input="updateTextOverlay"
      />
      <input
        type="text"
        placeholder="Course"
        v-model="details.course"
        class="input"
        @input="updateTextOverlay"
      />
    </div>
    <!-- <canvas ref="canvas" width="500" height="500" class="canvas"></canvas> -->
    <canvas
      ref="canvas"
      width="500"
      height="500"
      style="width: 500px; height: 500px"
      class="canvas"
    ></canvas>

    <button @click="downloadImage" class="button">Download Photo</button>

    <h3>Essential Links</h3>
    <ul>
      <!-- <li><a href="https://www.linkedin.com/in/jekayinoluwa/" target="_blank" rel="noopener">Say hi to me</a></li> -->
      <li>
        <a
          href="https://gdg.community.dev/gdg-on-campus-kwara-state-university-malete-nigeria/"
          target="_blank"
          rel="noopener"
          >Join GDGoC KWASU</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      details: {
        name: "",
        course: "",
      },
      nameText: null,
      courseText: null,
      canvas: null,
      staticText: {
        classYear: "CLASS OF 2024",
        professorName: "Professor Shaykh-Luqman Alade Jimoh",
        viceChancellor: "VICE-CHANCELLOR",
      },
      bannerText: null,
    };
  },

  methods: {
    uploadPhoto(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;

        if (!this.canvas) {
          this.canvas = new fabric.Canvas(this.$refs.canvas);
        }

        fabric.Image.fromURL(imageSrc, (img) => {
          img.scaleToWidth(this.canvas.width);
          this.canvas.clear(); // Clearing previous uploads
          img.set({ selectable: false });
          this.canvas.add(img);

          // add components here
          this.addLogo();
          this.addLogoText();
          this.addBanner();
          this.addStaticText();
          this.addLineDivider();
        });
      };
      reader.readAsDataURL(file);
    },

    addLogo() {
      fabric.Image.fromURL(require("@/assets/logo.png"), (logo) => {
        logo.scaleToWidth(50);
        logo.set({
          left: 10,
          top: 10,
          opacity: 0.9,
          selectable: false,
        });
        this.canvas.add(logo);
        this.canvas.renderAll();
      });
    },

    addLogoText() {
      const logoText = new fabric.Textbox("KWARA STATE UNIVERSITY\nNIGERIA", {
        left: 56,
        top: 14,
        fontSize: 12,
        fill: "white",
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        stroke: "black",
        strokeWidth: 0.6,
        charSpacing: 1,
        opacity: 0.98,
        fontWeight: "bold",
        fontFamily: "Arial",
        lineHeight: 1.2,
        width: 200,
        selectable: false,
      });

      this.canvas.add(logoText);
      this.canvas.renderAll();
    },

    addBanner() {
      const dynamicText = new fabric.Text(
        `${this.details.name || "Full Name"}`,
        `${this.details.course || "Course"}`
      );

      const textHeight = dynamicText.getBoundingRect().height;
      const bannerHeight = textHeight + 70;
      const bannerGradient = new fabric.Gradient({
        type: "linear",
        gradientUnits: "objectBoundingBox",
        coords: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1, // vertical gradient
        },
        colorStops: [
          { offset: 0, color: "rgba(1, 100, 61, 0.4)" },
          { offset: 0.5, color: "rgba(1, 121, 111, 0.3)" },
          { offset: 1, color: "rgba(0, 75, 81, 0.7)" },
        ],
      });

      const banner = new fabric.Rect({
        left: 0,
        top: this.canvas.height - bannerHeight,
        // fill: "#01796f",
        fill: bannerGradient,
        width: this.canvas.width,
        height: bannerHeight,
        selectable: false,
      });
      this.canvas.add(banner);

      this.addTextOverlay(bannerHeight);
    },

    addTextOverlay(bannerHeight) {
      if (!this.nameText || !this.courseText) {
        this.nameText = new fabric.Textbox(this.details.name || "Full Name", {
          left: this.canvas.width / 2,
          top: this.canvas.height - bannerHeight + 10,
          width: this.canvas.width - 40,
          textAlign: "center",
          originX: "center",
          fill: "white",
          fontSize: 16,
          fontWeight: "bold",
          fontFamily: "Merriweather, serif",
          selectable: false,
          lineHeight: 1.2,
        });
        this.canvas.add(this.nameText);

        this.courseText = new fabric.Textbox(this.details.course || "Course", {
          left: this.canvas.width / 2,
          top: this.nameText.top + this.nameText.height + 5,
          width: this.canvas.width - 40,
          textAlign: "center",
          originX: "center",
          fill: "white",
          opacity: 0.8,
          fontSize: 12,
          fontWeight: "normal",
          fontFamily: "Merriweather, serif",
          selectable: false,
          lineHeight: 1.2,
        });
        this.canvas.add(this.courseText);
      }
    },

    addLineDivider() {
      const divider = new fabric.Line(
        [
          this.canvas.width / 4.5,
          this.canvas.height - 60,
          (3 * this.canvas.width) / 4,
          this.canvas.height - 60,
        ],
        {
          stroke: "#ffffff",
          strokeWidth: 2,
          selectable: false,
        }
      );
      this.canvas.add(divider);
    },

    addStaticText() {
      const { classYear, professorName, viceChancellor } = this.staticText;

      const offset = 10;

      const classText = new fabric.Text(classYear, {
        left: this.canvas.width / 2,
        top: this.canvas.height - offset - 45,
        textAlign: "center",
        originX: "center",
        fill: "white",
        fontSize: 14,
        fontWeight: "bold",
        selectable: false,
      });
      this.canvas.add(classText);

      const professorText = new fabric.Text(professorName, {
        left: this.canvas.width / 2,
        top: this.canvas.height - offset - 26,
        textAlign: "center",
        originX: "center",
        fill: "white",
        opacity: 0.9,
        fontFamily: "Lobster, serif",
        fontSize: 14,
        fontWeight: "bold",
        selectable: false,
      });
      this.canvas.add(professorText);

      const viceChancellorText = new fabric.Text(viceChancellor, {
        left: this.canvas.width / 2,
        top: this.canvas.height - offset - 8,
        textAlign: "center",
        originX: "center",
        fill: "white",
        opacity: 0.7,
        fontSize: 8,
        fontWeight: "bold",
      });
      this.canvas.add(viceChancellorText);
    },

    updateTextOverlay() {
      if (this.nameText) {
        this.nameText.set({
          text: this.details.name || "Full Name",
        });

        if (this.courseText) {
          this.courseText.set({
            text: this.details.course || "Course",
            top: this.nameText.top + this.nameText.height + 5,
          });
        }
        this.canvas.renderAll();
      }
    },

    downloadImage() {
      if (this.canvas) {
        const scale = 2;
        const tempCanvas = this.canvas.toDataURL({
          format: "png",
          multiplier: scale,
        });
        const link = document.createElement("a");
        link.download = "graduation-banner.png";
        link.href = tempCanvas;
        link.click();
      }
    },
  },
};
</script>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}
.canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
}
.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}
.input {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

import React, { Component } from 'react'
import html2canvas from "html2canvas"
import Collage from "./components/Collage/Collage"
import './App.css';
import Homepage from "./components/Homepage/Homepage"
import Loading from "./components/Loading/Loading"
import Navbar from "./components/Navbar/Navbar"
import 'whatwg-fetch';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.getAlbumInfo = this.getAlbumInfo.bind(this);
    this.downloadImg = this.downloadImg.bind(this);
    this.goHome = this.goHome.bind(this);
    this.dataURLtoBlob = this.dataURLtoBlob.bind(this);
    this.state = {
      backendUrl: "https://last-fm.herokuapp.com/meta_info",
      albumInfo: null,
      page: "homepage",
      rows: null,
      cols: null
    }
    this.baseState = this.state
  }

  getAlbumInfo(user, category, period, rows, cols) {
    this.setState({
      page: "loading"
    })
    console.log(user, category, period, rows, cols)
    fetch(this.state.backendUrl, {
      method: "GET",
      headers: new Headers({
        user,
        category,
        period,
        rows,
        cols
      })
    }).then(d => d.json()).then(d => {
      console.log(d)
      this.setState({
        albumInfo: d,
        page: "collage",
        rows: rows,
        cols: cols
      })
    })
  }

  downloadImg() {
    if (this.state.page === "collage") {
      console.log("HERE!!!")
      let width = `${this.state.cols * 300}`
      let height = `${this.state.rows * 300}`
      console.log(width, height)
      let options = {
        windowWidth: width,
        windowHeight: height,
        width: width,
        height: height,
        x: 0,
        y: 0,
        backgroundColor: "#000000",
        allowTaint: true,
        useCORS: true,
        onclone: function (canvas) {
          console.log('onclone fired')
          let img = canvas.querySelector(".collage")
          canvas.querySelector(".main").style.width = width + "px";
          canvas.querySelector(".main").style.height = height + "px";
          canvas.querySelector(".sidebar").style.display = 'none';
          canvas.querySelector(".navbar").style.display = 'none';
          canvas.querySelectorAll(".imgWrapper").forEach(elm => elm.className = "imgWrapper")
          canvas.querySelectorAll(".imgElement").forEach(elm => elm.style["font-size"] = "4em")
          canvas.querySelectorAll(".albumImg").forEach(elm => elm.className = "img-fluid")
          console.log(canvas.querySelector(".main"))
          img.className = 'collage justify-content-left align-top m-0 p-0'

          img.style.width = width + "px"
          img.style.height = height + "px"
          img.style.top = 0
        }
      }
      html2canvas(document.getElementById("collage"), options)
        .then((canvas) => {
          //document.body.appendChild(canvas);
          let link = document.createElement('a');
          let imageData = canvas.toDataURL("image/png")
          let blob = this.dataURLtoBlob(imageData)
          let objurl = URL.createObjectURL(blob)
          link.download = "collage.png";
          link.href = objurl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    }
    else {
      console.log("wrong page")
      return
    }
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  goHome() {
    this.setState(this.baseState)
  }

  componentWillMount() {
    this.setState({
      page: "homepage"
    })
  }

  render() {
    return (
      <div className="app">
        <Navbar goHome={this.goHome} page={this.state.page} downloadImg={this.downloadImg} />
        <div className="main justify-content-center bg-primary">
          {this.state.page === "loading" ?
            <Loading />
            :
            <div></div>
          }
          {
            this.state.page === "collage" ?
              <Collage albumInfo={this.state.albumInfo} cols={this.state.cols} />
              :
              <div></div>
          }
          {
            this.state.page === "homepage" ?
              <Homepage getAlbumInfo={this.getAlbumInfo} />
              :
              <div></div>
          }

        </div>
      </div>
    );
  }
}


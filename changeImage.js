export function changeImage(image_changed, is_boy) {
  if (image_changed == false) {
    console.log("Updating 3. step picture, uploading guide");

    const imageElement1 = document.getElementsByClassName("image-5")[0];
    const imageElement2 = document.getElementById(
      "w-node-_64c267de-1f7b-60c8-f08e-df7363cd287d-f2b54ff2"
    );
    const imageElement3 = document.getElementById(
      "w-node-_5ab35103-f747-f14b-648c-fa1ee52dda2c-f2b54ff2"
    );
    const imageElement4 = document.getElementById(
      "w-node-c8bf5738-30c7-c414-4e66-bf7f05839cfa-f2b54ff2"
    );
    const imageElement5 = document.getElementById(
      "w-node-_47f06dcd-89d6-8710-a41b-fa0d1a830a72-f2b54ff2"
    );
    const imageElement6 = document.getElementById(
      "w-node-ce4f6a12-c0fa-b8c4-ea5d-29324ea4ee96-f2b54ff2"
    );

    function updateImage(imageElement, image_name, extension) {
      let url =
        "https://stastiem-public-assets.s3-accelerate.amazonaws.com/website/" +
        image_name +
        extension;

      console.log(
        "Updating image element: " + imageElement + " with url: " + url + ""
      );
      imageElement.src = url;
      // imageElement.srcset = url + " 500w, " +
      //                       url + " 800w, " +
      //                       url + " 1080w, " +
      //                       url + " 1600w, " +
      //                       url + " 2000w, ";
    }

    if (is_boy) {
      updateImage(imageElement1, "boy1", ".png");
      updateImage(imageElement2, "boy2", ".png");
      updateImage(imageElement3, "boy3", ".png");
      updateImage(imageElement4, "boy4", ".png");
      updateImage(imageElement5, "boy5", ".png");
      updateImage(imageElement6, "boy6", ".png");
    } else {
      updateImage(imageElement1, "girl1", ".png");
      updateImage(imageElement2, "girl2", ".png");
      updateImage(imageElement3, "girl3", ".png");
      updateImage(imageElement4, "girl4", ".png");
      updateImage(imageElement5, "girl5", ".png");
      updateImage(imageElement6, "girl6", ".png");
    }

    image_changed = true;
  }
}

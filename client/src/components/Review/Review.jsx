import React, { useState } from "react";
import "./Review.css";
import NavBar from "../Nav/NavBar";

export default function Review() {
  
  const allBilling = [  
    {
      id: "e780f4e9-e913-40b5-b112-7af84fcce7d4",
      name: null,
      telephone: null,
      direction: null,
      mail: "9191.julian@gmail.com",
      roll: "client",
      active: null,
      food: [],
      bills: [
          {
              id: "123",
              billId: "7fa1daff-fac8-4b6a-b910-14d0e5c0f22d",
              products: [{
                id: "2",
                name: "ASIA EXPRESS CHINESE",
                image: "https://www.visitconcordca.com/imager/s3-us-west-1_amazonaws_com/concord-2018/craft/Asia-Express-Chinese-Food_78c77f7e90fd3bfb1d9860e623e7e9a0.jpg",
                available: true,
                price: 4,
                discount: 1,
                reviews: [],
                type: "Salad",
                fat: "High",
                sodium: "High",
                sugar: "Medium",
                description: "Asia Express Chinese Food offers delicious dining and takeout to Concord, CA",
                qualification: 0,
                amount: 5,
                active: "valid"
            },
            {
                id: "3",
                name: "BAMBINO’S ITALIAN",
                image: "https://media.istockphoto.com/id/1142391463/photo/pasta-carbonara.jpg?s=612x612&w=0&k=20&c=7gO9mReNFzY10qsmu_X4_LZ45-UcVPtzpHF-DOFp6Cc=",
                available: true,
                price: 4,
                discount: 2,
                reviews: [],
                type: "Main dish",
                fat: "Low",
                sodium: "Low",
                sugar: "Medium",
                description: "Bambino’s is an Italian favorite here in Concord. Take a trip to Italy when you visit and try authentic",
                qualification: 0,
                amount: 1,
                active: "valid"
            }],
              value: null,
              discount: null,
              status: null,
              paid: true,
              createdAt: "2023-03-17T04:03:31.789Z",
              updatedAt: "2023-03-17T04:03:31.798Z",
              userId: "e780f4e9-e913-40b5-b112-7af84fcce7d4"
          },
          {
              id: "234",
              billId: "a9283d38-d875-487c-b093-851ce94f1863",
              products: [],
              value: null,
              discount: null,
              status: null,
              paid: false,
              createdAt: "2023-03-17T04:42:00.924Z",
              updatedAt: "2023-03-17T04:42:00.930Z",
              userId: "e780f4e9-e913-40b5-b112-7af84fcce7d4"
          }
      ]
  }]
  const [current, setcurrent] = useState(0)
  //----------
  let detail = ""
  const user = "el mail"//const { user } = useAuth0();
  allBilling.map((bill) => {                                     //facturas correspondientes al correo
    if (bill.user.eMail === user) detail = bill
  })
  //---------
  const temp = [];
  temp.push(detail.car.id)
  temp.push(0)
  temp.push("")

  const [qualify, setqualify] = useState(temp);

  function cl(e) {
    e.preventDefault();
    let cliced = e.target.className.split('|');
    const tempor = qualify
    tempor[((parseInt(cliced[0]) + 1) * 3) + 1] = parseInt(cliced[1]);
    setqualify(tempor)
    setcurrent(current + 1)
  }
  function changeComment(e) {
    e.preventDefault();
    const tempor = qualify
    tempor[((parseInt(e.target.className) + 1) * 3) + 2] = e.target.value;
    setqualify(tempor)
    setcurrent(current + 1)
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="bkng">
        <div className="reviewContenedor">
          <div id="reservedTittle" className="reservedTittle">Foods to qualify</div> <br /><br />
          <div>
            {detail.car.id !== "" ?
              <div className="barra">
                <div id="reviewNameStar">
                  <h4 id="reviewName">{detail.car.name} </h4>
                  <div id="reviewStart">
                    {qualify[1] >= 1 ? <button onClick={(e) => cl(e)} id="starTrue" className="-1|1">★</button> : <button onClick={(e) => cl(e)} id="starFalse" className="-1|1">☆</button>}
                    {qualify[1] >= 2 ? <button onClick={(e) => cl(e)} id="starTrue" className="-1|2">★</button> : <button onClick={(e) => cl(e)} id="starFalse" className="-1|2">☆</button>}
                    {qualify[1] >= 3 ? <button onClick={(e) => cl(e)} id="starTrue" className="-1|3">★</button> : <button onClick={(e) => cl(e)} id="starFalse" className="-1|3">☆</button>}
                    {qualify[1] >= 4 ? <button onClick={(e) => cl(e)} id="starTrue" className="-1|4">★</button> : <button onClick={(e) => cl(e)} id="starFalse" className="-1|4">☆</button>}
                    {qualify[1] >= 5 ? <button onClick={(e) => cl(e)} id="starTrue" className="-1|5">★</button> : <button onClick={(e) => cl(e)} id="starFalse" className="-1|5">☆</button>}
                  </div>
                  <div></div>
                </div>
                <textarea value={qualify[2]} id="reviewDetail" placeholder="Enter a comment:" className="-1" onChange={(e) => changeComment(e)} />
              </div> : null}

          </div> <br />
          <div className="reviewButon">
            <button id="confir" className="btn btn-success">Send</button>
          </div><br />
        </div>
      </div>
    </>
  );
}
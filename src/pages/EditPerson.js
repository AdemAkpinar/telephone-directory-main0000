// import React, { useState } from "react";

// import Header from "../components/Header";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../api/api";
// import urls from "../api/urls";
// import actionTypes from "../redux/actions/actionTypes";

// const EditPerson = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { personsState, groupsState } = useSelector((state) => state);
//   const myPerson = personsState.persons.find(
//     (item) => item.id === params.groupsId
//   );
//   const [form, setForm] = useState(myPerson);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (form.name === "" || form.surname === "" || form.groupsId === "") {
//       alert("Zorunlu alanları giriniz");
//       return;
//     }
//     api
//       .put(`${urls.persons}/${params.personId}`, form)
//       .then((res) => {
//         dispatch({
//           type: actionTypes.personActions.EDIT_PERSON,
//           payload: form,
//         });
//         navigate("/");
//       })
//       .catch((err) => {});
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container my-5">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Kişi Adı
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               placeholder="ADI"
//               value={form.name}
//               onChange={(event) =>
//                 setForm({ ...form, name: event.target.value })
//               }
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="surname" className="form-label">
//               Surname
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="surname"
//               placeholder="SOYADI"
//               value={form.surname}
//               onChange={(event) =>
//                 setForm({ ...form, surname: event.target.value })
//               }
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="Telefon" className="form-label">
//               Telefon
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               id="number"
//               placeholder="TELEFON NUMARASI"
//               value={form.number}
//               onChange={(event) =>
//                 setForm({ ...form, number: event.target.value })
//               }
//             />
//           </div>
//           <select
//             className="form-select"
//             defaultValue={groupsState.groups[0].id}
//             value={form.groupId}
//             onChange={(event) =>
//               setForm({ ...form, groupId: event.target.value })
//             }
//           >
//             {groupsState.groups.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <div className="d-flex justify-content-center my-5">
//             <button className="btn btn-primary w-50" type="submit">
//               Güncelle
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPerson;

import React, { useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

const EditPerson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { personsState, groupsState } = useSelector((state) => state);
  const myPerson = personsState.persons.find(
    (item) => item.id === params.personId
  );
  //console.log(myBook);
  const [form, setForm] = useState(myPerson);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "" || form.surname === "" || form.groupsId === "") {
      alert("Kitap adı, Yazar alanı ve kategori alanı zorunludur");
      return;
    }
    if (form.name.length < 2) {
      alert("Kitap ismi 2 karakterden az olamaz");
      return;
    }
    api
      .put(`${urls.persons}/${params.personId}`, form)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.EDIT_PERSON,
          payload: form,
        });
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Yalnızız"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Yazar
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Peyami Safa"
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Fiyatı
            </label>
            <input
              type="number"
              className="form-control"
              id="number"
              placeholder="69.70"
              value={form.number}
              onChange={(event) =>
                setForm({ ...form, number: Number(event.target.value) })
              }
            />
          </div>

          <select
            className="form-select"
            defaultValue={groupsState.groups[0].id}
            value={form.groupId}
            onChange={(event) =>
              setForm({ ...form, groupId: event.target.value })
            }
          >
            {groupsState.groups.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPerson;

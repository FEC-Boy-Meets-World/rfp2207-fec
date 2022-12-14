import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import http from "../Utilities/Atelier.jsx";
import {ProductContext} from "../App.jsx"

function QuestionModal({product_id, closeModal, mainQA, setQA}) {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({criteriaMode: "all"});
  const onSubmit = (data) => {
    const modalData = {
      'body': data.yourQuestion,
      'name': data.yourNickname,
      'email': data.yourEmail,
      'product_id': Number(product_id)
    }
    reset()
    closeModal(false)
    http.postQuestion(product_id, modalData)
      .then((res) => http.getQuestions(product_id))
      .then((res) => {setQA(res.data.results)})
      .catch((err) => {console.error(err)})
  }

  const {product_info} = useContext(ProductContext)
  // console.log('this is productInfo: ', productInfo)

  return (
    <div className="qa-modalBackground">
      <div className="qa-modalContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button className="qa-modalTitleCloseBtn"
              onClick={() => closeModal(false)}
            >
              x
            </button>
          <div className="qa-modalTitle">
            <h1>Ask Your Question</h1>
            {/* <h3>About the {currentProduct}</h3> */}
            <h3>About the {product_info.name}</h3>
          </div>
          <div className="qa-modalBody"></div>
            <label className="modalLabel">
              Your Question*
              <input
                className="modalInput"
                type="text"
                placeholder="Why did you like the product or not?"
                value="Does this product run large or small?"
              {...register("yourQuestion",
                {
                    required: "Question is required",
                    maxLength: {
                      value: 1000,
                      message: "Question is limited to 1000 characters"
                    }
                })
              }
              />
              <small>
                <ErrorMessage
                errors={errors}
                name="yourQuestion"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
            </label>
            <label className="modalLabel">
                Your Nickname*
              <input className="modalInput"
                type="text"
                placeholder="Example: jackson11!"
                value="jess123"
                {...register("yourNickname",
                  {
                    required: "Nickname is required",
                    maxLength: {
                      value: 60,
                      message: "Nickname is limited to 60 characters"
                    }
                  })
                }
              />
              <small>
                <ErrorMessage
                errors={errors}
                name="yourNickname"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
              <small className="modalSubtext">For privacy reasons, do not use your full name or email address</small>
              <br></br>
            </label>
            <label className="modalLabel">
                Your Email*
              <input className="modalInput"
                type="email"
                placeholder="Example: jack@email.com"
                value="helloWorld@gmail.com"
                {...register("yourEmail",
                  {
                    required: "Email is required",
                    maxLength: {
                      value: 60,
                      message: "Email is limited to 60 characters"
                    },
                    // pattern: {
                    //   value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    //   message: "Email needs to follow username@email.com format"
                    // }
                  })
                }
              />
              <small>
                <ErrorMessage
                errors={errors}
                name="yourEmail"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
              <small className="modalSubtext">For authentication reasons, you will not be emailed</small>
              <br></br>
            </label>

          <div className="qa-modalFooter">
            <button className="qa-modalFooterBtn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default QuestionModal
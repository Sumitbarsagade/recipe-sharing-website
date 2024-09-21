import React from 'react'

export default function Contact() {
  return (
    <section className="form5 h-fit  p-10" id="contact-form-3-umUEyodXlN">
      <div className="container mx-auto  px-4">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="text-center mb-12">
              <h3 className="text-4xl text-black font-bold mb-0">
                <strong>Get in Touch!</strong>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-8/12 mx-auto">
            <form action="" method="POST" className="form-with-styler" data-form-title="Form Name">


              <input type="hidden" name="email" className='' data-form-email="true" value=""/>


              <div className="mb-4 hidden" data-form-alert="">
                <div className="alert alert-success">
                  Thanks for filling out the form!
                </div>
              </div>
              <div className="mb-4 hidden" data-form-alert-danger="">
                <div className="alert alert-danger">
                  Oops...! some problem!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Name" data-form-field="name" className="form-control w-full p-2 border border-gray-300 rounded-md" id="name-contact-form-3-umUEyodXlN" />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email" data-form-field="email" className="form-control w-full p-2 border border-gray-300 rounded-md" id="email-contact-form-3-umUEyodXlN" />
                </div>
              </div>

              <div className="form-group mt-4">
                <input type="phone" name="url" placeholder="Phone" data-form-field="url" className="form-control w-full p-2 border border-gray-300 rounded-md" id="url-contact-form-3-umUEyodXlN" />
              </div>

              <div className="form-group mt-4">
                <textarea name="textarea" placeholder="Message" data-form-field="textarea" className="form-control w-full p-2 border border-gray-300 rounded-md" id="textarea-contact-form-3-umUEyodXlN"></textarea>
              </div>

              <div className="text-center mt-6">
                <button type="submit" className="btn bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                  Send It!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

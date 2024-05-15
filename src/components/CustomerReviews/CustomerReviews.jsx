import { Tooltip } from "react-tooltip";

const CustomerReviews = () => {
  const testimonials = [
    {
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "John Doe",
      title: "Software Engineer",
      quote:
        "Sharing meals on this app has connected me with wonderful neighbors and saved so much food from going to waste!",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Martin Escobar",
      title: "Graphic Designer",
      quote:
        "I love how easy it is to share my homemade dishes and discover new recipes from my community.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sam Smith",
      title: "Teacher",
      quote:
        "This app has not only helped me reduce food waste but also allowed me to meet some fantastic people in my neighborhood.",
    },
  ];

  return (
    <section className="py-14 mt-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-3xl font-semibold sm:text-4xl">
            See what others saying about us
          </h3>
          <p className="mt-3">
            Hear from our happy community members! See how Share and Savor has
            brought neighbors together through the joy of sharing home-cooked
            meals. Read their stories and experiences below.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li key={idx} className="p-4 rounded-xl shadow-md border">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <div
                      className="w-16 h-16"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={item.name || "Not available"}
                    >
                      <img
                        src={item.avatar}
                        className="h-full w-full object-cover object-center rounded-full"
                      />
                    </div>
                    <Tooltip id="my-tooltip" />
                    <div>
                      <span className="block  font-semibold">{item.name}</span>
                      <span className="block  text-sm mt-0.5">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 ">{item.quote}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

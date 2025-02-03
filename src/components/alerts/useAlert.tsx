// Aquí estamos transformando el error para que siga el tipo ApiError
import Swal from "sweetalert2";

const useAlert = () => {
  //   const navigate = useNavigate();

  // const setAlert = (data) => {
  //   Swal.fire({
  //     title: data.title,
  //     text: data.text,
  //     html: data.html,
  //     icon: data.icon,
  //     confirmButtonColor: data.confirmButtonColor || "success",
  //     confirmButtonText: data.confirmButtonText || "Continuar",
  //     showCancelButton: data.showCancelButton || false,
  //     cancelButtonText: data.cancelButtonText || "Cancelar",
  //     didOpen: () => {
  //       if (data.timer) Swal.showLoading();
  //       if (data.socket) {
  //         data.socket.close();
  //       }
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed && data.confirm) data.confirm();
  //     if (data.navigate) {
  //       if (
  //         data.navigate.startsWith("http") ||
  //         data.navigate.startsWith("https")
  //       ) {
  //         window.location.href = data.navigate;
  //       } else if (
  //         data.navigate.includes("www") &&
  //         !data.navigate.startsWith("http")
  //       ) {
  //         window.location.href = "https://" + data.navigate;
  //       } else {
  //       }
  //     }
  //   });
  // };

  // const setLoadingAlert = (data) => {
  //   Swal.fire({
  //     title: data.title,
  //     text: data.text,
  //     showConfirmButton: false,
  //     timerProgressBar: true,
  //     timer: 3000,
  //     didOpen: () => {
  //       if (data.timer) Swal.showLoading();
  //     },
  //   }).then(() => {
  //   });
  // };

  const setNewAlert = ({
    title = "",
    text = "",
    icon = "",
    confirm = () => {},
    confirmButtonText = null,
  }) =>
    Swal.fire({
      html: `
                        <style>
                            /* Ajuste del z-index para que siempre esté al frente */
                            .swal2-container {
                                z-index: 2000 !important; /* Mayor que otros modales */
                            }
                        </style>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="
                                display: flex; 
                                justify-content: center; 
                                align-items: center; 
                                background-color: ${
                                  icon === "error" ? "#fdecea" : "#e8f5e9"
                                }; /* Fondo según tipo */
                                border-radius: 50%; 
                                width: 80px; 
                                height: 80px; 
                                margin-bottom: 20px;">
                                <img src="${
                                  icon === "error"
                                    ? "/icons/errorIcon.svg"
                                    : "/icons/successIcon.svg"
                                }" 
                                     alt="${
                                       icon === "error"
                                         ? "Error Icon"
                                         : "Success Icon"
                                     }" 
                                     style="width: 40px; height: 40px; color: ${
                                       icon === "error" ? "#f44336" : "#4caf50"
                                     };">
                            </div>
                            <h2 style="
                                font-size: 18px; 
                                font-weight: 500; 
                                color: ${
                                  icon === "error" ? "#b71c1c" : "#2e2e2e"
                                }; /* Texto según tipo */
                                text-align: center; 
                                margin: 0;">
                                ${title}
                            </h2>
                            <p style="
                                font-size: 14px; 
                                font-weight: 400; 
                                color: #555; /* Color del texto del mensaje */
                                text-align: center; 
                                margin: 10px 0 0;">
                                ${text}
                            </p>
                        </div>
                    `,
      showConfirmButton: true,
      confirmButtonText: confirmButtonText
        ? confirmButtonText
        : icon === "error"
        ? "Cancelar"
        : "Entendido", // Texto dinámico
      confirmButtonColor: icon === "error" ? "#f44336" : "#1DB954", // Color según tipo
      preConfirm: () => {
        if (typeof confirm === "function") {
          return confirm(); // Ejecutar la función pasada en confirm
        }
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.backdrop) {
        if (typeof confirm === "function") {
          confirm();
        }
      }
    });

  // const setCustomAlert = ({
  //   title,
  //   text,
  //   icon,
  //   confirmAction,
  //   showCancelButton = true,
  //   confirmButtonText,
  // }) =>
  //   Swal.fire({
  //     html: `
  //                           <style>
  //                               /* Ajustar el z-index del contenedor */
  //                               .swal2-container {
  //                                   z-index: 2000 !important; /* Mayor que el z-index del modal existente */
  //                               }
  //                               /* Estilo del contenedor del ícono */
  //                               .icon-container {
  //                                   display: flex;
  //                                   justify-content: center;
  //                                   align-items: center;
  //                                   background-color: #fff4e5; /* Fondo del ícono */
  //                                   border-radius: 50%;
  //                                   width: 72px;
  //                                   height: 72px;
  //                                   margin: 0 auto 24px auto;
  //                               }
  //                               .icon-container img {
  //                                   width: 36px;
  //                                   height: 36px;
  //                               }
  //                               /* Estilo del título */
  //                               .swal2-title {
  //                                   font-size: 20px;
  //                                   font-weight: bold;
  //                                   color: #333333;
  //                                   text-align: center;
  //                                   margin-bottom: 20px !important; /* Asegurar margen inferior entre título y texto */
  //                                   line-height: 1.4 !important;
  //                               }
  //                               /* Estilo del texto */
  //                               .swal2-html-container {
  //                                   font-size: 14px !important;
  //                                   margin-bottom: 8px !important;
  //                                   font-weight: 400;
  //                                   color: #666666;
  //                                   text-align: center;
  //                                   line-height: 1.7 !important;;
  //                                   margin-top: 20px !important;
  //                               }
  //                               /* Botón Aceptar */
  //                               .custom-accept-btn {
  //                                   background-color: #d84315;
  //                                   color: #ffffff;
  //                                   border: 2px solid transparent;
  //                                   border-radius: 50px;
  //                                   padding: 12px 24px;
  //                                   font-size: 16px;
  //                                   font-weight: 600;
  //                                   cursor: pointer;
  //                                   margin-right: 8px;
  //                               }
  //                               .custom-accept-btn:hover {
  //                                   background-color: #bf360c;
  //                               }
  //                               /* Botón Cancelar */
  //                               .custom-cancel-btn {
  //                                   background-color: transparent;
  //                                   color: #d84315;
  //                                   border: 2px solid #d84315;
  //                                   border-radius: 50px;
  //                                   padding: 12px 24px;
  //                                   font-size: 16px;
  //                                   font-weight: 600;
  //                                   cursor: pointer;
  //                               }
  //                               .custom-cancel-btn:hover {
  //                                   background-color: #fff4e5;
  //                               }
  //                               .swal2-actions {
  //                                   display: flex;
  //                                   justify-content: center;
  //                                   gap: 12px;
  //                                   flex-direction: row-reverse; /* Invertir el orden */
  //                               }
  //                           </style>
  //                           <div>
  //                               <div class="icon-container">
  //                                   <img src="/icons/warning.svg" alt="Warning Icon">
  //                               </div>
  //                               <h2>${title}</h2>
  //                               <p>${text}</p>
  //                           </div>
  //                       `,
  //     showCancelButton,
  //     cancelButtonText: "Cancelar",
  //     confirmButtonText: confirmButtonText ? confirmButtonText : "Aceptar",
  //     customClass: {
  //       confirmButton: "custom-accept-btn",
  //       cancelButton: "custom-cancel-btn",
  //       htmlContainer: "custom-swal-html-container",
  //       title: ".swal2-title",
  //     },
  //     buttonsStyling: false,
  //     preConfirm: () => {
  //       if (typeof confirmAction === "function") {
  //         return confirmAction();
  //       }
  //     },
  //   });

  // const setCustomInfo = ({
  //   title,
  //   text,
  //   confirmAction,
  //   cancelAction,
  //   confirmButtonText = "Entendido",
  //   showCancelButton = false,
  //   cancelButtonText = "Cancelar",
  // }) => {
  //   Swal.fire({
  //     html: `
  //                               <style>
  //                                   /* Ajustar el z-index del contenedor */
  //                                   .swal2-container {
  //                                       z-index: 2000 !important; /* Mayor que el z-index del modal existente */
  //                                   }
  //                                   /* Estilo del contenedor del ícono */
  //                                   .icon-container {
  //                                       display: flex;
  //                                       justify-content: center;
  //                                       align-items: center;
  //                                       background-color: #E0F2FE; /* Fondo del ícono */
  //                                       border-radius: 50%;
  //                                       width: 64px;
  //                                       height: 64px;
  //                                       margin: 0 auto 24px auto;
  //                                   }
  //                                   .icon-container img {
  //                                       width: 60px;
  //                                       height: 60px;
  //                                   }
  //                                   /* Estilo del título */
  //                                   .swal2-title {
  //                                       font-size: 20px;
  //                                       font-weight: bold;
  //                                       color: #333333;
  //                                       text-align: center;
  //                                       line-height: 1.4;
  //                                   }
  //                                   /* Estilo del texto */
  //                                   .swal2-html-container {
  //                                       font-size: 14px !important;
  //                                       font-weight: 400;
  //                                       color: #666666;
  //                                       text-align: center;
  //                                       margin: 8px;
  //                                       line-height: 1.4;
  //                                   }
  //                                   /* Botón Entendido */
  //                                   .custom-accept-btn {
  //                                       background-color: #0273AD;
  //                                       color: #ffffff;
  //                                       border: 2px solid transparent;
  //                                       border-radius: 50px;
  //                                       padding: 12px 24px;
  //                                       font-size: 16px;
  //                                       font-weight: 600;
  //                                       cursor: pointer;
  //                                       margin-left: 8px;
  //                                   }
  //                                   .custom-accept-btn:hover {
  //                                       background-color: #0C53B7;
  //                                   }
  //                                   /* Botón Cancelar */
  //                                   .custom-cancel-btn {
  //                                       background-color: #ffffff;
  //                                       color: #0273AD;
  //                                       border: 1px solid #0273AD;
  //                                       border-radius: 50px;
  //                                       padding: 12px 24px;
  //                                       font-size: 16px;
  //                                       font-weight: 600;
  //                                       cursor: pointer;
  //                                       margin-right: 8px;
  //                                   }
  //                                   .custom-cancel-btn:hover {
  //                                       background-color: #E6F4FD;
  //                                   }
  //                               </style>
  //                               <div style="padding:2em">
  //                                   <div class="icon-container">
  //                                       <img src="/icons/info.svg" alt="Info Icon">
  //                                   </div>
  //                                   <h2>${title}</h2>
  //                                   <br />
  //                                   <p>${text}</p>
  //                               </div>
  //                           `,
  //     cancelButtonText: cancelButtonText,
  //     showCancelButton: showCancelButton,
  //     confirmButtonText: confirmButtonText,
  //     customClass: {
  //       confirmButton: "custom-accept-btn",
  //       cancelButton: "custom-cancel-btn",
  //       htmlContainer: "custom-swal-html-container",
  //     },
  //     buttonsStyling: false,
  //     reverseButtons: true, // Invertir el orden de los botones
  //     preConfirm: () => {
  //       if (typeof confirmAction === "function") {
  //         return confirmAction();
  //       }
  //     },
  //     preDeny: () => {
  //       if (typeof cancelAction === "function") {
  //         return cancelAction();
  //       }
  //     },
  //   });
  // };

  // const setCustomWarning = ({
  //   title,
  //   text,
  //   confirmAction,
  //   cancelAction,
  //   confirmButtonText = "Entendido",
  //   showCancelButton = false,
  //   cancelButtonText = "Cancelar",
  // }) => {
  //   Swal.fire({
  //     html: `
  //                               <style>
  //                                   /* Ajustar el z-index del contenedor */
  //                                   .swal2-container {
  //                                       z-index: 2000 !important; /* Mayor que el z-index del modal existente */
  //                                   }
  //                                   /* Estilo del contenedor del ícono */
  //                                   .icon-container {
  //                                       display: flex;
  //                                       justify-content: center;
  //                                       align-items: center;
  //                                       background-color: #FFEDD5; /* Fondo del ícono */
  //                                       border-radius: 50%;
  //                                       width: 64px;
  //                                       height: 64px;
  //                                       margin: 0 auto 24px auto;
  //                                   }
  //                                   .icon-container img {
  //                                       width: 64px;
  //                                       height: 64px;
  //                                   }
  //                                   /* Estilo del título */
  //                                   .swal2-title {
  //                                       font-size: 20px;
  //                                       font-weight: bold;
  //                                       color: #000000DE;
  //                                       text-align: center;
  //                                       line-height: 1.4;
  //                                   }
  //                                   /* Estilo del texto */
  //                                   .swal2-html-container {
  //                                       font-size: 14px !important;
  //                                       font-weight: 400;
  //                                       color: #666666;
  //                                       text-align: center;
  //                                       margin: 8px;
  //                                       line-height: 1.4;
  //                                   }
  //                                   /* Botón Entendido */
  //                                   .custom-accept-btn {
  //                                       background-color: #CD4D0B;
  //                                       color: #ffffff;
  //                                       border: 2px solid transparent;
  //                                       border-radius: 50px;
  //                                       padding: 12px 24px;
  //                                       font-size: 16px;
  //                                       font-weight: 600;
  //                                       cursor: pointer;
  //                                       margin-left: 8px;
  //                                   }
  //                                   .custom-accept-btn:hover {
  //                                       background-color: #d17c52;
  //                                   }
  //                                   /* Botón Cancelar */
  //                                   .custom-cancel-btn {
  //                                       background-color: #ffffff;
  //                                       color: #CD4D0B;
  //                                       border: 2px solid #CD4D0B;
  //                                       border-radius: 50px;
  //                                       padding: 12px 24px;
  //                                       font-size: 16px;
  //                                       font-weight: 600;
  //                                       cursor: pointer;
  //                                       margin-right: 8px;
  //                                   }
  //                                   .custom-cancel-btn:hover {
  //                                       background-color: #FFEDD5;
  //                                   }
  //                               </style>
  //                               <div style="padding:2em">
  //                                   <div class="icon-container">
  //                                       <img src="/icons/warning.svg" alt="Warning Icon" style="width:38.13px">
  //                                   </div>
  //                                   <h2>${title}</h2>
  //                                   <br />
  //                                   <p>${text}</p>
  //                               </div>
  //                           `,
  //     cancelButtonText: cancelButtonText,
  //     showCancelButton: showCancelButton,
  //     confirmButtonText: confirmButtonText,
  //     customClass: {
  //       confirmButton: "custom-accept-btn",
  //       cancelButton: "custom-cancel-btn",
  //       htmlContainer: "custom-swal-html-container",
  //     },
  //     buttonsStyling: false,
  //     reverseButtons: true, // Invertir el orden de los botones
  //     preConfirm: () => {
  //       if (typeof confirmAction === "function") {
  //         return confirmAction();
  //       }
  //     },
  //     preDeny: () => {
  //       if (typeof cancelAction === "function") {
  //         return cancelAction();
  //       }
  //     },
  //   });
  // };

  return {
    // setAlert,
    // setLoadingAlert,
    setNewAlert,
    // setCustomAlert,
    // setCustomInfo,
    // setCustomWarning,
  };
};

export default useAlert;

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatStep } from '@angular/material/stepper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RegistrosService } from 'src/app/service/registros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
})
export class EstudianteComponent implements OnInit {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  selectedImageUrl: SafeUrl | undefined;
  selectedPdfNameImagen: string | undefined;

  selectedPdfUrlBachillerato: SafeUrl | undefined;
  selectedPdfNameBachillerato: string | undefined;

  selectedPdfUrlDomicilio: SafeUrl | undefined;
  selectedPdfNameDomicilio: string | undefined;

  bachilleratos: any[] = [];
  especialidades: any[] = [];
  ciudades: any[] = [];
  carreras: any[] = [];

  @ViewChild('stepper', { static: false }) stepper: MatStepper | undefined;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private registrosService: RegistrosService
  ) {
    this.stepOneForm = this.fb.group({
      Nombre: ['', Validators.required],
      ApellidoP: ['', Validators.required],
      ApellidoM: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern(/^\d{0,10}$/)]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Bachillerato: ['', Validators.required],
      PromedioBachillerato: [
        '',
        [Validators.required, Validators.min(6), Validators.max(10)],
      ],
      Especialidad: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      Calle: ['', Validators.required],
      Numero: ['', Validators.required],
      Colonia: ['', Validators.required],
      CodigoPostal: ['', Validators.required], //Falta Implementar
      Ciudad: ['', Validators.required],
      TelefonoCasa: [
        '',
        [Validators.required, Validators.pattern(/^\d{0,10}$/)],
      ],
      TelefonoPadres: [
        '',
        [Validators.required, Validators.pattern(/^\d{0,10}$/)],
      ],
      NombreMadre: ['', Validators.required],
      ApellidoPMadre: ['', Validators.required],
      ApellidoMMadre: ['', Validators.required],
      NombrePadre: ['', Validators.required],
      ApellidoPPadre: ['', Validators.required],
      ApellidoMPadre: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      Carrera: ['', Validators.required],
      FechaRegistro: ['', Validators.required],
      FotoEstudiante: [''], // Falta ver que rollo
      CertificadoBachillerato: [''], // Falta ver que rollo
      ComprobanteDomicilio: [''], // Falta ver que rollo
      MatriculaEstudiante: [''],
    });
  }

  ngOnInit() {
    this.obtenerCiudades();
    this.obtenerCarreras();
    this.obtenerBachilleratos();
    this.obtenerEspecialidades();
  }

  get isFormValid(): boolean {
    return (
      this.stepOneForm.valid &&
      this.stepTwoForm.valid &&
      this.stepThreeForm.valid
    );
    // Puedes incluir también la validación para que ciertos campos no sean obligatorios si lo requieres.
  }

  goToNextStep(): void {
    if (this.stepper) {
      this.stepper.next();
    }
  }
  resetForm(): void {
    // Restablece cada formulario individualmente
    this.stepOneForm.reset();
    this.stepTwoForm.reset();
    this.stepThreeForm.reset();

    // Si tienes controles de formulario que necesitan ser reiniciados a un valor específico, puedes pasarlos como argumento:
    // Por ejemplo:
    // this.stepOneForm.reset({
    //   Nombre: 'Valor por defecto',
    //   ApellidoP: 'Valor por defecto',
    //   // otros campos...
    // });

    // Restablece también cualquier variable que esté utilizando para mostrar vistas previas de archivos seleccionados o imágenes
    this.selectedImageUrl = undefined;
    this.selectedPdfUrlBachillerato = undefined;
    this.selectedPdfNameBachillerato = undefined;
    this.selectedPdfUrlDomicilio = undefined;
    this.selectedPdfNameDomicilio = undefined;

    // Y si tienes un stepper y quieres regresar al primer paso
    if (this.stepper) {
      this.stepper.reset();
    }
  }

  onFileSelected(event: Event, campo: string): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result contiene el archivo en base64
        const result = reader.result as string;
        // Puedes eliminar el prefijo del Data URL si es necesario
        const base64Data = result.split(',')[1];
        // Actualiza el valor del campo correspondiente en el formulario
        this.stepThreeForm.patchValue({ [campo]: base64Data });
        // Detecta cambios para actualizar la vista
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  generateMatricula(
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string
  ): string {
    const mes = new Date().getMonth() + 1; // getMonth() devuelve un rango de 0-11
    const año = new Date().getFullYear().toString().substr(-2); // Obtener los dos últimos dígitos del año actual
    return (
      apellidoPaterno.substr(0, 2).toUpperCase() +
      apellidoMaterno.substr(0, 2).toUpperCase() +
      nombre[0].toUpperCase() +
      '-' +
      mes.toString().padStart(2, '0') + // Asegurar que el mes siempre tenga 2 dígitos
      año
    );
  }

  submitForm(): void {
    const nombre = this.stepOneForm.get('Nombre')?.value;
    const apellidoPaterno = this.stepOneForm.get('ApellidoP')?.value;
    const apellidoMaterno = this.stepOneForm.get('ApellidoM')?.value;

    const matriculaEstudiante = this.generateMatricula(
      nombre,
      apellidoPaterno,
      apellidoMaterno
    );

    const registroData = {
      id_ciudad: this.stepTwoForm.value.Ciudad,
      id_bachillerato: this.stepOneForm.value.Bachillerato,
      id_especialidad: this.stepOneForm.value.Especialidad,
      id_carrera: this.stepThreeForm.value.Carrera,
      nombre_estudiante: this.stepOneForm.value.Nombre,
      apellido_paterno_estudiante: this.stepOneForm.value.ApellidoP,
      apellido_materno_estudiante: this.stepOneForm.value.ApellidoM,
      calle: this.stepTwoForm.value.Calle,
      numero: this.stepTwoForm.value.Numero,
      colonia: this.stepTwoForm.value.Colonia,
      codigo_postal: this.stepTwoForm.value.CodigoPostal,
      telefono_casa: this.stepTwoForm.value.TelefonoCasa,
      telefono_estudiante: this.stepOneForm.value.Telefono,
      telefono_tutor: this.stepTwoForm.value.TelefonoPadres,
      promedio_bachillerato: this.stepOneForm.value.PromedioBachillerato,
      nombre_madre: this.stepTwoForm.value.NombreMadre,
      apellido_paterno_madre: this.stepTwoForm.value.ApellidoPMadre,
      apellido_materno_madre: this.stepTwoForm.value.ApellidoMMadre,
      nombre_padre: this.stepTwoForm.value.NombrePadre,
      apellido_paterno_padre: this.stepTwoForm.value.ApellidoPPadre,
      apellido_materno_padre: this.stepTwoForm.value.ApellidoMPadre,
      fecha_registro: new Date().toISOString().split('T')[0], // Fecha actual en formato ISO sin tiempo
      foto_estudiante: this.stepThreeForm.value.FotoEstudiante,
      certificado_bachillerato:
        this.stepThreeForm.value.CertificadoBachillerato,
      comprobante_domicilio: this.stepThreeForm.value.ComprobanteDomicilio,
      correo_estudiante: this.stepOneForm.value.CorreoElectronico,
      matricula_estudiante: matriculaEstudiante,
    };

    // Muestra en la consola los valores combinados (opcional)
    console.log('Formulario enviado con éxito:', registroData);

    // Enviar los datos al backend
    this.registrosService.createRegistroEstudiante(registroData).subscribe(
      (response) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'El registro se ha realizado correctamente. Por favor, verifica tu correo electrónico para visualizar tu matrícula.',
          icon: 'success',
          confirmButtonText: 'Entendido',
        });
        console.log('Registro de estudiante creado con éxito:', response);
        this.resetForm();
        // Aquí puedes realizar acciones adicionales tras una respuesta exitosa
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el registro. Por favor, verifica los datos ingresados.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al crear el registro:', error);
      }
    );
  }

  onPhoneNumberInput(event: Event, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    let currentValue = inputElement.value;

    currentValue = currentValue.replace(/[^0-9]/g, '');

    if (currentValue.length > 10) {
      currentValue = currentValue.slice(0, 10);
    }

    let currentForm: FormGroup | undefined;

    if (this.stepper && this.stepper.selectedIndex === 0) {
      currentForm = this.stepOneForm;
    } else if (this.stepper && this.stepper.selectedIndex === 1) {
      currentForm = this.stepTwoForm;
    } else if (this.stepper && this.stepper.selectedIndex === 2) {
      currentForm = this.stepThreeForm;
    }

    currentForm?.get(controlName)?.setValue(currentValue);
  }

  obtenerCiudades() {
    this.registrosService.getCiudades().subscribe(
      (ciudades) => {
        this.ciudades = ciudades;
        console.log('Ciudades:', ciudades);
      },
      (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    );
  }

  obtenerCarreras() {
    this.registrosService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
        console.log('Carreras:', carreras);
      },
      (error) => {
        console.error('Error al obtener carreras:', error);
      }
    );
  }

  obtenerBachilleratos() {
    this.registrosService.getBachilleratos().subscribe(
      (bachilleratos) => {
        this.bachilleratos = bachilleratos;
        console.log('Bachilleratos:', bachilleratos);
      },
      (error) => {
        console.error('Error al obtener bachilleratos:', error);
      }
    );
  }

  obtenerEspecialidades() {
    this.registrosService.getEspecialidades().subscribe(
      (especialidades) => {
        this.especialidades = especialidades;
        console.log('Especialidades:', especialidades);
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  }
}

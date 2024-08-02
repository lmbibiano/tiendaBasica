
  <main class="container">
    <section>
      <form id="formRegistro" enctype="multipart/form-data">
        <div class="form-group row w-50 m-auto">
          <div class="form-group col-12 col-sm-6">
            <label for="nombre">Nombre</label>
            <input class="form-control m-auto" type="text" name="nombre" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="apellido">Apellido</label>
            <input class="form-control m-auto" type="text" name="apellido" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="rut">Rut</label>
            <input class="form-control m-auto" type="text" name="rut" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="email">Email</label>
            <input class="form-control m-auto" type="email" name="email" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="password">Password</label>
            <input class="form-control m-auto" type="password" name="password" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="replyPassword">Repita la password</label>
            <input class="form-control m-auto" type="password" name="replyPassword" required />
          </div>
          <div class="text-center d-flex m-2 col-12 col-sm-8 m-4">
            <p class="text-center m-2">Telefono</p>
            <input class="form-control m-auto" type="text" name="telf" />
          </div>
          <div class="form-group col-12 col-sm-12">
            <label for="imagen">Foto de perfil</label>
            <input type="file" name="foto" accept="image/*" />
          </div>
        </div>
        <h3 class="text-center">Direccion</h3>
        <div class="form-group row w-50 m-auto">
          <div class="form-group col-12 col-sm-6">
            <label for="calle">Calle</label>
            <input class="form-control m-auto" type="text" name="calle" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="numero">N° Casa / Departamento</label>
            <input class="form-control m-auto" type="text" name="numero" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="comuna">Comuna</label>
            <input class="form-control m-auto" type="text" name="comuna" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="region">Region</label>
            <input class="form-control m-auto" type="text" name="region" required />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="pais">Pais</label>
            <input class="form-control m-auto" type="text" name="pais" required />
          </div>
        </div>
        <hr class="py-2 my-4">

package com.sistema.examenes.controladores;

import com.sistema.examenes.modelo.Rol;
import com.sistema.examenes.modelo.Task;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.modelo.UsuarioRol;
import com.sistema.examenes.servicios.TaskService;
import com.sistema.examenes.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public List<Task> listarTask(@PathVariable("id") int id) throws Exception {
        try {
            return taskService.listarTask(id);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateTask(@RequestBody Task task, @PathVariable Long id) throws Exception{
        try {
            this.taskService.update(task, id);
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }
    @GetMapping(value = "/obtener/{id}")
    public Task findTaskById(@PathVariable("id") int id) throws Exception{
        try {
            return this.taskService.listById(id);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PostMapping("/")
    public Task guardarTask(@RequestBody Task task) throws Exception{
        
        return this.taskService.guardarTask(task);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteTask(@PathVariable("id") Long id)throws Exception{
        this.taskService.eliminarTask(id);
    }

}

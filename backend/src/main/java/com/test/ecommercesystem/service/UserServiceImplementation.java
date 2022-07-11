package com.test.ecommercesystem.service;


import org.springframework.beans.factory.annotation.Autowired;
import com.test.ecommercesystem.repository.UserRepo;
import com.test.ecommercesystem.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

import static com.test.ecommercesystem.Controller.UserController.checkExpiration;
import static com.test.ecommercesystem.Controller.UserController.getCurrentDate;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public int checkUser(User user) {
        List<User> userList = new ArrayList<>();

        userList = userRepo.findAll();

        for(User u : userList){
            if(u.getUsername() == user.getUsername()){
                if(u.getPassword() == user.getPassword()){
                    return 1;
                }
            }
            }
        return -1;
        }

    @Override
    public int checkCreateUser(User user){
        List<User> userList = new ArrayList<>();

        userList = userRepo.findAll();
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());

        for(User u : userList){

            if(u.getEmail().equals(user.getEmail())){
                return 2;
            }else if(u.getUsername().equals(user.getUsername())){
                return 3;
            }
        }
        return 1;
    }

    @Override
        public int authorizeUser (@RequestBody String token){
            System.out.println("phase 1");
            List<User> userList = new ArrayList<>();
            userList = userRepo.findAll();
            long current = getCurrentDate();
            current = current/1000000;
            System.out.println("phase 2");


            for(User u: userList){
                if(u.getConfirmToken().equals(token)){
                    long expiration = u.getExpirationMinutes();
                    if(checkExpiration(current, expiration) == false) {
                        System.out.println("phase 4");
                        u.setConfirmToken("");
                        u.setEnabled(1);
                        return 1;
                    }else {
                        u.setConfirmToken("");
                        return -1;
                    }
                }else{
                    return -2;
                }
            }

            return -1;
        }


}
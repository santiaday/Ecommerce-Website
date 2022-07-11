package com.test.ecommercesystem.Controller;

import com.test.ecommercesystem.model.User;
import com.test.ecommercesystem.model.UserToken;
import com.test.ecommercesystem.repository.UserRepo;
import com.test.ecommercesystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.test.ecommercesystem.emailer.EmailSenderService;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
@CrossOrigin (origins = "http://localhost:3000")

public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private UserService userService;


    private UserToken userToken;

    public static long getCurrentDate() {
        Date date = new Date();
        long currentS = date.getTime();
        currentS = TimeUnit.MILLISECONDS.toMinutes(currentS);
        return currentS;
    }

    public static long getExpirationDate(long currentS) {

        long expirationS = currentS + 1440;
        return expirationS;
    }

    public static boolean checkExpiration(long current, long expiration){
        if(Math.max(current, expiration) == expiration){
            return true;
        }

        return false;
    }

    public static String generateToken(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    @PostMapping("/add")
    public String add(@RequestBody User user) throws MessagingException {
        String token = generateToken(25);
        String link = "http://localhost:3000/link-confirmation-code-token=" + token;

        try {
            emailSenderService.sendSimpleEmail(
                    user.getEmail(),
                    "<html><body><img src='cid:attachment'><br><br><span style=\"font-size:12px;\">Thank you for joining Excellent Store Inc.! Please follow this link to activate your account.<br><br>" + link + "</span></body></html>",
                    "Email Confirmation Link"
            );
        }catch (MessagingException e){
            return "-1";
        }

        long currentS = getCurrentDate();
        long expiration = getExpirationDate(currentS);

        user.setConfirmToken(token);
        user.setExpirationMinutes(expiration);
        userService.saveUser(user);


        return "New user has been added";
    }

    @PostMapping("/resetPassword")
    public int add(@RequestBody String email) throws MessagingException {
        List<User> userList = new ArrayList<>();
        userList = userService.getAllUsers();

        for(User u:userList){
            String uEmail = "\"" + u.getEmail() + "\"";
            if(uEmail.equals(email)) {
                String token = generateToken(25);
                String link = "http://localhost:3000/password-reset-token=" + token;

                try {
                    emailSenderService.sendSimpleEmail(
                            email,
                            "<html><body><img src='cid:attachment'><br><br><span style=\"font-size:12px, color:black\">Thank you for joining Excellent Store Inc.! Please follow this link to reset your password.<br><br>" + link + "</span></body></html>",
                            "Password Reset Link"
                    );
                } catch (MessagingException e) {
                    return -1;
                }

                long currentS = getCurrentDate();
                long expiration = getExpirationDate(currentS);

                u.setPasswordToken(token);
                u.setPasswordExpirationMinutes(expiration);
                userService.saveUser(u);

                return 1;
            }else{
                return -1;
            }
        }

        return -2;
    }

    @PostMapping("/updateEnabledUser")
    public void updateEnabledUser (@RequestBody UserToken userToken){

        List<User> userList = new ArrayList<>();
        userList = userService.getAllUsers();

        for(User u:userList){

            if(u.getConfirmToken().equals(userToken.getToken()) && userToken.getResult() == 1){
                u.setConfirmToken("");
                u.setEnabled(1);
                u.setExpirationMinutes(0);
                userRepo.save(u);
            }else if(u.getConfirmToken().equals(userToken.getToken()) && userToken.getResult() == 0){
                u.setConfirmToken("");
                userRepo.save(u);
            }
        }
    }
    @PostMapping("/authorizeUser")
    public int authorizeUser (@RequestBody String token){
        List<User> userList = new ArrayList<>();
        userList = userService.getAllUsers();
        long current = getCurrentDate();


        for(User u: userList) {
            String uToken = "\"" + u.getConfirmToken() + "\"";
            if(uToken.equals(token)){

               long expiration = u.getExpirationMinutes();
               if(checkExpiration(current, expiration) == true) {
                   return 1;
               }else {
                   return -1;
               }
            }


        }

        return -2;
    }


    @PostMapping("/checkUser")
    public int checkUser(@RequestBody User user){
        List<User> userList = new ArrayList<>();
        userList = userService.getAllUsers();
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());

        for(User u : userList){
            if(u.getUsername().equals(user.getUsername()) || u.getEmail().equals(user.getUsername())){

                if(u.getPassword().equals(user.getPassword())){
                    if(u.getEnabled() == 1){
                        return 1;
                    }
                    return -2;
                }
            }
        }
        return -1;
    }

    @PostMapping("/checkCreateUser")
    public int checkCreateUser(@RequestBody User user){
        List<User> userList = new ArrayList<>();

        userList = userService.getAllUsers();

        for(User u : userList){

            if(u.getEmail().equals(user.getEmail()) || user.getEnabled() == 1){
                return 2;
            }else if(u.getUsername().equals(user.getUsername()) || user.getEnabled() == 1){
                return 3;
            }
        }
        return 1;
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

}

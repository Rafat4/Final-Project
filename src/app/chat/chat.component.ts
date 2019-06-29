import { Component, OnInit } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = [];
  users = [];
  currentUser: any;
  showChat:boolean = false;

  _message: string = '';
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  get user() {
    return this.loginService.user();
  }

  get userName(){
    return this.user.firstName + " " + this.user.lastName;
  }

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.showChat = false;
  }

  sendMessage() {
    const { message, currentUser } = this;
    currentUser.sendMessage({
      text: message,
      roomId: '19894724',
    });
    this.message = '';
  }

  addUser() {
    axios.post('http://localhost:3000/users', { username: this.userName })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:3000/authenticate'
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:300895a8-5720-48ed-bbfc-aa605e9202a0',
          userId: this.userName,
          tokenProvider: tokenProvider
        });

        return chatManager
          .connect()
          .then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: '19894724',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.messages.push(message);
                },
                onPresenceChanged: (state, user) => {
                  this.users = currentUser.users.sort((a, b) => {
                    if (a.presence.state === 'online') return -1;

                    return 1;
                  });
                },
              },
            });

            this.currentUser = currentUser;
            this.users = currentUser.users;
            this.showChat = true;
          });
      })
      .catch(error => {
        console.error(error)
      });
  }

  closeChat(){
    this.showChat = false;
  }
}

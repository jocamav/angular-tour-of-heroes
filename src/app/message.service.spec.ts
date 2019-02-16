import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {

  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getMessages() should return empty messages list', () => {
    expect(service.getMessages().length).toBe(0);
  });

  it('#add(message: string) should insert one message', () => {
    const message: string = 'Some message';
    service.add(message);
    expect(service.getMessages().length).toBe(1);
    expect(service.getMessages()[0]).toBe(message);
  });

  it('#clear() should return one message after insert one message', () => {
    service.add('message #1');
    service.add('message #2');
    service.add('message #3');
    service.add('message #4');
    expect(service.getMessages().length).toBe(4);

    service.clear();
    expect(service.getMessages().length).toBe(0);
  });

});

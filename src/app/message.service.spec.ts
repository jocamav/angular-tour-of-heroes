import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('#getMessages() should return empty messages list', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service.getMessages().length).toBe(0);
  });

  it('#add(message: string) should insert one message', () => {
    const service: MessageService = TestBed.get(MessageService);
    const message: string = 'Some message';
    service.add(message);
    expect(service.getMessages().length).toBe(1);
    expect(service.getMessages()[0]).toBe(message);
  });

  it('#clear() should return one message after insert one message', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.add('message #1');
    service.add('message #2');
    service.add('message #3');
    service.add('message #4');
    expect(service.getMessages().length).toBe(4);

    service.clear();
    expect(service.getMessages().length).toBe(0);
  });

});

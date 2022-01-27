import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Picture} from "../../models/picture";
import {PictureFrameComponent} from "./picture-frame.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('PictureFrameComponent', () => {

  const pictures: Picture[] = Array.from({length: 2}).map((_, i) => ({
    id: 'id' + i,
    description: 'description' + i,
    urlRegular: 'regular' + i,
    urlSmall: 'small' + i
  }))

  let component: PictureFrameComponent;
  let fixture: ComponentFixture<PictureFrameComponent>;
  let el: DebugElement;

  beforeEach(() => {
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureFrameComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureFrameComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })

  it('should contain the pictures specified by the inputs', () => {
    component.picture1 = pictures[0];
    fixture.detectChanges();
    const images = el.queryAll(By.css('img'));
    expect(images.length).toBe(1);

    component.picture2 = pictures[1];
    fixture.detectChanges();
    const images2 = el.queryAll(By.css('img'));
    expect(images2.length).toBe(2);
    expect(images2[0].nativeElement.src.endsWith('/small0')).toBeTrue();
    expect(images2[1].nativeElement.src.endsWith('/small1')).toBeTrue();
  })
});

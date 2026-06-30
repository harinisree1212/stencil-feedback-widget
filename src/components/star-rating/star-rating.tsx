import { RatingSummary } from '../rating-summary/rating-summary';
import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  Method,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'star-rating',
  styleUrl: 'star-rating.css',
  shadow: true,
})
export class StarRating {

  @Prop() max: number = 5;
  @Prop() label: string = 'Rate your experience';
  @Prop({ reflect: true }) disabled: boolean = false;

  @State() selected: number = 0;
  @State() hovered: number = 0;

  @Event() ratingChange!: EventEmitter<number>;

  componentWillLoad() {
    console.log('[lifecycle] componentWillLoad: max =', this.max);
  }

  componentDidLoad() {
    console.log('[lifecycle] componentDidLoad: widget is now visible');
  }

  componentWillRender() {
    console.log('[lifecycle] componentWillRender: about to draw', this.selected, 'stars');
  }

  componentDidRender() {
    console.log('[lifecycle] componentDidRender: draw complete');
  }

  disconnectedCallback() {
    console.log('[lifecycle] disconnectedCallback: widget removed, cleaning up');
  }

  @Watch('selected')
  watchSelected(newValue: number, oldValue: number) {
    console.log(`[watch] selected changed from ${oldValue} to ${newValue}`);
    this.ratingChange.emit(newValue);
  }

  @Method()
  async reset(): Promise<void> {
    this.selected = 0;
    this.hovered = 0;
  }

  @Method()
  async getValue(): Promise<number> {
    return this.selected;
  }

  private selectStar = (value: number) => {
    if (this.disabled) return;
    this.selected = value;
  };

  private hoverStar = (value: number) => {
    if (this.disabled) return;
    this.hovered = value;
  };

  private clearHover = () => {
    this.hovered = 0;
  };

  render() {
    const display = this.hovered || this.selected;

    return (
      <Host class={{ 'is-disabled': this.disabled }}>
        <p class="label">{this.label}</p>
        <div role="radiogroup" aria-label={this.label} class="stars">
          {Array.from({ length: this.max }, (_, i) => i + 1).map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === this.selected ? 'true' : 'false'}
              aria-label={`${star} out of ${this.max} stars`}
              disabled={this.disabled}
              class={star <= display ? 'star filled' : 'star'}
              onClick={() => this.selectStar(star)}
              onMouseEnter={() => this.hoverStar(star)}
              onMouseLeave={() => this.clearHover()}
            >
              ★
            </button>
          ))}
        </div>
        {this.selected > 0 && (
          <RatingSummary value={this.selected} max={this.max} />
        )}
      </Host>
    );
  }
}
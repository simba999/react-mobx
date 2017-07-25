import React, { Component } from 'react';

class Checkbox extends Component {
	change(){
		let checked = this.el.checked;
		this.props.handleChange(this.props.value, checked);
		if( checked && this.props.isText ) {
			setTimeout( ()=>{ this.textEl && this.textEl.focus() } , 80);
		}
	}
	updateValue(e){
		this.props.handleChange(this.props.value, true, e.target.value);
	}
	render(){
		const optionClass = this.props.optionClass || '';
		let disabled = ( this.props.isMaxReached && !this.props.checked );
		let style={userSelect:'none'};
		disabled && (style.color="#ccc");
		return (
			<div className={`checkbox ${disabled?'disabled':''} ${this.props.checked?'checked':''}`}>
				<label style={style} className={optionClass}>
					<input type='checkbox' name={this.props.name} checked={this.props.checked} disabled={disabled} ref={el=>this.el=el} onChange={this.change.bind(this)} />
					{this.props.title}
					{ this.props.isText && this.props.checked ?
						<div><input type="text" ref={ el=>this.textEl=el } onChange={this.updateValue.bind(this)} /></div>
						: ''
					}
				</label>
			</div>
		)
	}
}

class MultiSelect extends React.Component {
	constructor(props){
		super(props);
		let options = this.props.options.map( o=>{ o.checked=!!o.checked; return o; } );
		let checkedCount = options.filter( o=>o.checked ).length;
		let isMaxReached = this.props.max ? checkedCount >= this.props.max : false;
		this.state = { options, checkedCount, isMaxReached };

		this._multiselectName = this.props.name || `multiselect${Math.random()*777777|0}`;
	}

	handleChange( value, checked, text='' ){
		let options = this.state.options.slice(0);
		let checkedCount=0;
		options = options.map( o=>{
			if(o.value === value) { /* the element being changed */
				o.checked = checked;
				o.text = text;
			}
			o.checked && checkedCount++;
			return o;
		});
		let isMaxReached = checkedCount >= this.props.max;
		this.setState({ options, checkedCount, isMaxReached });

		let selectedValues = options.filter( o=>o.checked ).map( o=>{
			return o.text || o.value;
		} );

		if(typeof this.props.onChange ==='function' ){
			this.props.onChange({
				selectedValues
			})
		}
	}

	render(){
		const optionClass = this.props.optionClass || '';
		return (
			<div className="form-group">
				{this.state.options.map( o=>{
					return <Checkbox
						key={o.value}
						isText={o.isText}
						optionClass={optionClass}
						name={this._multiselectName}
						isMaxReached={this.state.isMaxReached} {...o} handleChange={this.handleChange.bind(this)}
					/>
				})}
			</div>
		)
	}
}


export default MultiSelect

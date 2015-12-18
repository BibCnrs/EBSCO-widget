import Icon from 'react-fa';
import ViewAbstract from '../../../lib/components/ViewAbstract';

describe('ViewAbstract', function () {
    let component, onShowAbstract;

    describe('abstractShown prop set to true', function () {
        let index, abstractShown;
        before(function () {
            onShowAbstract = function onShowAbstract(i, v) {
                index = i;
                abstractShown = v;
            };

            component = enzyme.shallow(<ViewAbstract index={7} onShowAbstract={onShowAbstract} abstractShown={true} abstract="To summmarize this is all of it." />);
        });

        it('should display abstract', function () {
            const button = component.find('button');
            const icon = button.find('Icon');
            assert.deepEqual(icon.type(), Icon);
            assert.equal(icon.props().name, 'eye-slash');
            const div = component.find('div');
            assert.equal(div.props().className, 'abstract shown');
            const p = div.find('p');
            assert.equal(p.text(), 'To summmarize this is all of it.');
        });

        it('should call onShowAbstract with index props and false', function () {
            component.find('button').simulate('click');
            assert.equal(index, 7);
            assert.equal(abstractShown, false);
        });
    });

    describe('abstractShown prop set to false', function () {
        let index, abstractShown;
        before(function () {
            onShowAbstract = function onShowAbstract(i, v) {
                index = i;
                abstractShown = v;
            };

            component = enzyme.shallow(
                <ViewAbstract
                    index={7}
                    onShowAbstract={onShowAbstract}
                    abstractShown={false}
                    abstract="To summmarize this is all of it."
                />
            );
        });

        it('should not display abstract', function () {
            const button = component.find('button');
            const icon = button.find('Icon');
            assert.deepEqual(icon.type(), Icon);
            assert.equal(icon.props().name, 'eye');
            const div = component.find('div');
            assert.equal(div.props().className, 'abstract hidden');
        });

        it('should call onShowAbstract with index props and true', function () {
            component.find('button').simulate('click');
            assert.equal(index, 7);
            assert.equal(abstractShown, true);
        });
    });

    describe('no abstract provided', function () {
        before(function () {
            onShowAbstract = function onShowAbstract() {};

            component = enzyme.shallow(
                <ViewAbstract
                    index={7}
                    onShowAbstract={onShowAbstract}
                    abstractShown={false}
                />
            );
        });

        it('should disable button', function () {
            const button = component.find('button');
            assert.isTrue(button.props().disabled, 'button');
        });
    });
});

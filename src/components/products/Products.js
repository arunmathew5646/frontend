import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Nav, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Login } from 'login';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collection-preview/Collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import { CollectionsOverviewContainer } from './collections-overview.styles';

export { App };

function MultiActionAreaCard() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/photos/blue-sneakers-isolated-on-white-background-picture-id1308274455?s=612x612"
            alt="Blue Shoes"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Shoes
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Blue sneakers
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            BUY
          </Button>
        </CardActions>
      </Card>
    );
  }

  function Product() {
    return (
      <div className="App">
        {price.map(price => (
          <div key={price.id} style={{ margin: '30px' }}>
            <div>{`Price: ${price.name}`}</div>
          </div>
        ))}
      </div>
    );
  }

const CollectionsOverview = ({ collections }) => (
    <CollectionsOverviewContainer>
        {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview)(MultiActionAreaCard);

function App() {
    return (
        <div className="app-container bg-light">
            <Router history={history}>
                <Nav />
                <div className="container pt-4 pb-4">
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}